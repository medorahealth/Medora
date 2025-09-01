package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	app "github.com/medorahealth/Medora/server/internal/app"
	appHttp "github.com/medorahealth/Medora/server/internal/http" // alias since package is `http`
	"github.com/medorahealth/Medora/server/internal/http/handler"
	"github.com/medorahealth/Medora/server/internal/repo"
	"github.com/medorahealth/Medora/server/internal/service"
	_"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ No .env file found, using environment variables")
	}

	// Initialize DB (uses DATABASE_URL env var)
	db := app.InitDB()
	defer db.Close()

	// ----------------------
	// Wire User dependencies
	// ----------------------
	userRepo := repo.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	// ----------------------
	// Wire Order dependencies
	// ----------------------
	orderRepo := repo.NewOrderRepo(db)
	orderService := service.NewOrderService(orderRepo)
	orderHandler := handlers.NewOrderHandler(orderService)

	// ----------------------
	// Setup Router
	// ----------------------
	r := appHttp.NewRouter(userHandler, orderHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server running on :%s\n", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal("Server failed:", err)
	}
}
