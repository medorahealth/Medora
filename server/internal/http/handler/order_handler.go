// internal/handlers/order_handlers.go
package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/medorahealth/Medora/server/internal/util/auth"
	"github.com/medorahealth/Medora/server/internal/model"
	"github.com/medorahealth/Medora/server/internal/service"

	"github.com/gorilla/mux"
)

type OrderHandler struct {
	service *service.OrderService
}

func NewOrderHandler(s *service.OrderService) *OrderHandler {
	return &OrderHandler{service: s}
}

func (h *OrderHandler) CreateOrderHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserIDFromContext(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized - missing user ID", http.StatusUnauthorized)
			return
		}

		var order model.Order
		if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		order.UserID = userID

if err := h.service.CreateOrder(r.Context(), &order); err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Order created successfully\n"))
	}
}

func (h *OrderHandler) GetOrderHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := auth.GetUserIDFromContext(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized - missing user ID", http.StatusUnauthorized)
			return
		}

		vars := mux.Vars(r)
		orderID := vars["id"]

// GetOrderHandler
order, err := h.service.GetOrder(r.Context(), orderID, userID)
if err != nil {
    http.Error(w, "Order not found", http.StatusNotFound)
    return
}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(order)
	}
}
