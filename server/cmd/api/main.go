// cmd/api/main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/internal/auth"
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/handlers"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file: ", err)
	}

	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to the database
	db, err := database.ConnectDB(cfg.MongoURI, cfg.MongoDBName)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Disconnect() // Close connection on exit

	// Initialize services (e.g., Razorpay client) - Not implemented here, but add them

	// Initialize the router
	router := mux.NewRouter()

	// === Define API Routes ===
	// Auth routes
	router.HandleFunc("/register", handlers.RegisterUserHandler(db)).Methods("POST")
	router.HandleFunc("/login", handlers.LoginUserHandler(db)).Methods("POST")

	// Lab Test routes
	router.HandleFunc("/tests", handlers.GetAllLabTestsHandler(db)).Methods("GET")
	router.HandleFunc("/tests/{id}", handlers.GetLabTestHandler(db)).Methods("GET")
	router.HandleFunc("/tests/women-health", handlers.GetWomenHealthTestsHandler(db)).Methods("GET")
	router.HandleFunc("/tests", auth.Authenticate(handlers.CreateLabTestHandler(db))).Methods("POST")     // Protected!
	router.HandleFunc("/tests/{id}", auth.Authenticate(handlers.UpdateLabTestHandler(db))).Methods("PUT") // Protected!

	// Order routes (Requires Authentication)
	router.HandleFunc("/orders", auth.Authenticate(handlers.CreateOrderHandler(db))).Methods("POST")
	router.HandleFunc("/orders/{id}", auth.Authenticate(handlers.GetOrderHandler(db))).Methods("GET")
	router.HandleFunc("/orders/{id}", auth.Authenticate(handlers.UpdateOrderStatusHandler(db))).Methods("PUT") // ADMIN ONLY!

	//Razorpay Routes(Requires Authentication)
	router.HandleFunc("/razorpay/orders", auth.Authenticate(handlers.CreateRazorpayOrderHandler(db))).Methods("POST")
	router.HandleFunc("/razorpay/verify", auth.Authenticate(handlers.VerifyRazorpayPaymentHandler(db))).Methods("POST")

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server listening on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
