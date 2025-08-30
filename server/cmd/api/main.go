package main

import (
	"log"
	"github.com/medorahealth/Medora/server/internal/app"
)

func main() {
	db := app.InitDB()
	defer db.Close()

	log.Println("API starting...")
	// start HTTP server here...
}
