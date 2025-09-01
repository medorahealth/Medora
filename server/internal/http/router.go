// internal/http/routers.go
package http

import (
	"net/http"

	"github.com/medorahealth/Medora/server/internal/http/handler"
	"github.com/medorahealth/Medora/server/internal/http/router"

	"github.com/go-chi/chi/v5"
)

func NewRouter(userHandler *handlers.UserHandler, orderHandler *handlers.OrderHandler) http.Handler {
	r := chi.NewRouter()

	// Global middlewares (logging, recovery, cors, etc.) can go here
	// r.Use(middleware.Logger)

	// User routes
	r.Mount("/api/v1/users", router.UserRouter(userHandler))

	// Order routes
	r.Mount("/api/v1/orders", router.OrderRouter(orderHandler))

	// Health check or root endpoint
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	return r
}
