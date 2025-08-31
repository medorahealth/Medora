// internal/handlers/order_handlers.go
package handlers

import (
	"encoding/json"
	"net/http"

	"backend/internal/auth"
	"backend/internal/database"
	"backend/internal/models"

	"github.com/gorilla/mux"
)

// CreateOrderHandler creates a new order.
func CreateOrderHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from the context
		userID := auth.GetUserIDFromContext(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized - missing user ID", http.StatusUnauthorized)
			return
		}

		var order models.Order
		if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Basic Order Validation (Expand this as needed)
		if len(order.Items) == 0 {
			http.Error(w, "Order must contain at least one item", http.StatusBadRequest)
			return
		}

		order.UserID = userID

		err := db.CreateOrder(&order)
		if err != nil {
			http.Error(w, "Failed to create order", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Order created successfully\n"))
	}
}

// GetOrderHandler retrieves a specific order by ID.
func GetOrderHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from the context
		userID := auth.GetUserIDFromContext(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized - missing user ID", http.StatusUnauthorized)
			return
		}

		vars := mux.Vars(r)
		orderID := vars["id"]

		order, err := db.GetOrder(orderID, userID)

		if err != nil {
			http.Error(w, "Order not found", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(order)
	}
}

// UpdateOrderStatusHandler updates the status of an order.
func UpdateOrderStatusHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// TODO: Add ADMIN Role Authentication
		//vars := mux.Vars(r)
		//orderID := vars["id"]

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Update Order Status Handler called\n"))
	}
}
