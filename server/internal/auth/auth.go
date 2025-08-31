// internal/auth/auth.go
package auth

import (
	"context"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const (
	jwtExpirationTime = time.Hour * 24 // Token expires in 24 hours
)

// Claims struct
type Claims struct {
	UserID string `json:"userID"`
	jwt.StandardClaims
}

// Generate JWT token
func GenerateJWT(userID string) (string, error) {
	jwtSecretKey := os.Getenv("JWT_SECRET_KEY")
	if jwtSecretKey == "" {
		jwtSecretKey = "your-secret-key" // Fallback for development
	}

	expirationTime := time.Now().Add(jwtExpirationTime)
	claims := &Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(jwtSecretKey))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// Middleware to verify JWT token
func Authenticate(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Extract token from header
		authHeader := r.Header.Get("Authorization")

		//Check if Auth Header is valid
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Split the header to get the token
		bearerToken := strings.Split(authHeader, " ")

		if len(bearerToken) != 2 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenString := bearerToken[1]
		if tokenString == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Get JWT secret key from environment
		jwtSecretKey := os.Getenv("JWT_SECRET_KEY")
		if jwtSecretKey == "" {
			jwtSecretKey = "your-secret-key" // Fallback for development
		}

		// Validate token
		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecretKey), nil
		})
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		if !token.Valid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Add user ID to request context
		ctx := context.WithValue(r.Context(), "userID", claims.UserID)
		r = r.WithContext(ctx)

		// Call next handler
		next(w, r)
	}
}

// Helper to extract UserID from Context
func GetUserIDFromContext(ctx context.Context) string {
	userID, ok := ctx.Value("userID").(string)
	if !ok {
		return "" // Or handle the error appropriately
	}
	return userID
}
