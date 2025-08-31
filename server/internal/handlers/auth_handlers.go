// internal/handlers/auth_handlers.go
package handlers

import (
	"encoding/json"
	"net/http"

	"backend/internal/auth"
	"backend/internal/database"
	"backend/internal/models"

	"golang.org/x/crypto/bcrypt"
)

// RegisterUserHandler handles user registration
func RegisterUserHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}
		user.Password = string(hashedPassword)

		// Store the User Data.
		err = db.CreateUser(&user)

		if err != nil {
			http.Error(w, "Failed to register user", http.StatusInternalServerError)
			return
		}

		// Generate JWT token
		token, err := auth.GenerateJWT(user.ID)
		if err != nil {
			http.Error(w, "Failed to generate JWT token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": token})

		// Placeholder
		w.Write([]byte("Register User Handler Called\n"))

	}
}

// LoginUserHandler handles user login
func LoginUserHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var credentials struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Get User by Email
		user, err := db.GetUserByEmail(credentials.Email)

		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		// Verify password
		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password))
		if err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		// Generate JWT token
		token, err := auth.GenerateJWT(user.ID)
		if err != nil {
			http.Error(w, "Failed to generate JWT token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": token})
	}
}
