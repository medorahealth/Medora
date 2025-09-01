// internal/middleware/auth_middleware.go
package middleware

import (
	"net/http"
	"os"
	"strings"
	"github.com/medorahealth/Medora/server/internal/util/auth"

	"github.com/golang-jwt/jwt/v5"
	
)

// Authenticate validates JWT token and injects userID into context
func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenString := parts[1]

		jwtSecretKey := os.Getenv("JWT_SECRET_KEY")
		if jwtSecretKey == "" {
			jwtSecretKey = "your-secret-key" // fallback for dev
		}

		claims := &Claims{} // your custom claims struct
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecretKey), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Inject userID into context
		ctx := auth.SetUserIDInContext(r.Context(), claims.UserID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Claims defines the JWT payload structure
type Claims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}
