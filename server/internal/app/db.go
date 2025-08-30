package app

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func InitDB() *pgxpool.Pool {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		// Fallback if env var not set
		dbURL = "postgres://zomato_user:secret123@localhost:5432/zomato_app"
	}

	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		log.Fatalf("Unable to parse DATABASE_URL: %v\n", err)
	}

	// Tune pool
	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	dbpool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v\n", err)
	}

	// test the connection
	if err := dbpool.Ping(ctx); err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}

	fmt.Println("✅ Connected to PostgreSQL!")
	DB = dbpool
	return dbpool
}
