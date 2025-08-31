// internal/config/config.go
package config

import (
	"os"
)

// Config struct holds application configuration
type Config struct {
	MongoURI          string
	MongoDBName       string
	Port              string
	JWTSecret         string
	RazorpayKeyID     string
	RazorpayKeySecret string
	// Add other configuration variables here
}

// LoadConfig loads configuration from environment variables
func LoadConfig() (*Config, error) {
	return &Config{
		MongoURI:          os.Getenv("MONGODB_URI"),
		MongoDBName:       os.Getenv("MONGODB_NAME"),
		Port:              os.Getenv("PORT"),
		JWTSecret:         os.Getenv("JWT_SECRET"),
		RazorpayKeyID:     os.Getenv("RAZORPAY_KEY_ID"),
		RazorpayKeySecret: os.Getenv("RAZORPAY_KEY_SECRET"),
	}, nil
}
