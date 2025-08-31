package auth


import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const jwtExpirationTime = 24 * time.Hour

type Claims struct {
    UserID int64 `json:"userID"`
    jwt.RegisteredClaims
}

func GenerateJWT(userID int64) (string, error) {
    jwtSecretKey := os.Getenv("JWT_SECRET_KEY")
    if jwtSecretKey == "" {
        jwtSecretKey = "your-secret-key" // fallback for dev
    }

    expirationTime := time.Now().Add(jwtExpirationTime)

    claims := &Claims{
        UserID: userID,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(expirationTime),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(jwtSecretKey))
}

