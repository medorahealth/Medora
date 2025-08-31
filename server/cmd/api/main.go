package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	app "github.com/medorahealth/Medora/server/internal/app"
	appHttp "github.com/medorahealth/Medora/server/internal/http" // alias since package is `http`
	"github.com/medorahealth/Medora/server/internal/http/handler"
	"github.com/medorahealth/Medora/server/internal/repo"
	"github.com/medorahealth/Medora/server/internal/service"

	_ "github.com/jackc/pgx/v5/stdlib"

)

func main() {

	  if err := godotenv.Load(); err != nil {
        log.Println("⚠️ No .env file found, using environment variables")
    }

	// Initialize DB (uses DATABASE_URL env var)
	db := app.InitDB()
	defer db.Close()

	// Wire dependencies
	userRepo := repo.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	// Setup router entry
	r := appHttp.NewRouter(userHandler)

	log.Println("🚀 Server running on :8080")
	http.ListenAndServe(":8080", r)
}
