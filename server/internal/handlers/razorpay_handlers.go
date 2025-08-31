// internal/handlers/razorpay_handlers.go
package handlers

import (
	"backend/internal/auth"
	"backend/internal/database"
	"net/http"
)

// CreateRazorpayOrderHandler
func CreateRazorpayOrderHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from the context
		userID := auth.GetUserIDFromContext(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized - missing user ID", http.StatusUnauthorized)
			return
		}

		//TODO: Call to the actual Razorpay API
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Create RazorPay Order Handler Called"))
	}
}

// VerifyRazorpayPaymentHandler
func VerifyRazorpayPaymentHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from the context
		userID := auth.GetUserIDFromContext(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized - missing user ID", http.StatusUnauthorized)
			return
		}

		//TODO: Call to the actual Razorpay API
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Verify RazorPay Payment Handler Called"))
	}
}
