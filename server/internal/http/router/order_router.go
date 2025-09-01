// internal/http/router/order_route.go
package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/medorahealth/Medora/server/internal/http/handler"
	"github.com/medorahealth/Medora/server/internal/http/middleware"
)

// OrderRouter returns a chi.Router for order endpoints
func OrderRouter(orderHandler *handlers.OrderHandler) http.Handler {
	r := chi.NewRouter()

	// Use JWT middleware for all order routes
	r.Use(middleware.Authenticate)

	// Order routes
	r.Post("/", orderHandler.CreateOrderHandler())            // Create new order
	r.Get("/{id}", orderHandler.GetOrderHandler())            // Get order by ID
	// r.Put("/{id}/status", orderHandler.UpdateOrderStatusHandler()) // Update order status (admin)

	return r
}
