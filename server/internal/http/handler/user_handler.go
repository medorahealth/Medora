package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

		"github.com/medorahealth/Medora/server/internal/util/auth"
		"github.com/medorahealth/Medora/server/internal/service"
)

// DTOs
type registerRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type authResponse struct {
	Token string `json:"token"`
}

// Response helper
func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

type UserHandler struct {
	service service.UserService
}

func NewUserHandler(service service.UserService) *UserHandler {
	return &UserHandler{service: service}
}

// POST /register
func (h *UserHandler) RegisterUserHandler(w http.ResponseWriter, r *http.Request) {
	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	user, err := h.service.Register(ctx, req.Name, req.Email, req.Password)
	if err != nil {
		switch err {
		case service.ErrEmailExists:
			respondJSON(w, http.StatusConflict, map[string]string{"error": "email already registered"})
		default:
			respondJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}
		return
	}

	// ✅ Generate JWT after successful registration
	token, err := auth.GenerateJWT(user.ID)
	if err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	respondJSON(w, http.StatusCreated, authResponse{Token: token})
}

// POST /login
func (h *UserHandler) LoginUserHandler(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	user, err := h.service.Login(ctx, req.Email, req.Password)
	if err != nil {
		switch err {
		case service.ErrInvalidCredentials:
			respondJSON(w, http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
		default:
			respondJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}
		return
	}

	// ✅ Generate JWT after successful login
	token, err := auth.GenerateJWT(user.ID)
	if err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	respondJSON(w, http.StatusOK, authResponse{Token: token})
}
