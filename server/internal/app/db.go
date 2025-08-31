package app

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() *pgxpool.Pool {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("❌ DATABASE_URL not set")
	}

	// Mask password for logging
	safeURL := dbURL
	if idx := strings.Index(safeURL, "@"); idx != -1 {
		beforeAt := safeURL[:idx]
		if colonIdx := strings.Index(beforeAt, ":"); colonIdx != -1 {
			beforeAt = beforeAt[:colonIdx+1] + "****"
		}
		safeURL = beforeAt + safeURL[idx:]
	}
	fmt.Println("🔗 Using DB URL:", safeURL)

	// Parse and configure
	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		log.Fatalf("Unable to parse DATABASE_URL: %v\n", err)
	}

	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	dbpool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v\n", err)
	}

	if err := dbpool.Ping(ctx); err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}

	fmt.Println("✅ Connected to PostgreSQL!")
	DB = dbpool
	return dbpool
}
