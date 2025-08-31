// internal/handlers/test_handlers.go
package handlers

import (
	"encoding/json"
	"net/http"

	"backend/internal/database"
	"backend/internal/models"

	"github.com/gorilla/mux"
)

// GetAllLabTestsHandler retrieves all lab tests from the database.
func GetAllLabTestsHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tests, err := db.GetAllLabTests()
		if err != nil {
			http.Error(w, "Failed to retrieve lab tests", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tests)
	}
}

// GetLabTestHandler retrieves a specific lab test by ID.
func GetLabTestHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		testID := vars["id"]

		test, err := db.GetLabTestByID(testID)
		if err != nil {
			http.Error(w, "Lab test not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(test)
	}
}

// CreateLabTestHandler creates a new lab test.
func CreateLabTestHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var test models.LabTest
		if err := json.NewDecoder(r.Body).Decode(&test); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := db.CreateLabTest(&test)
		if err != nil {
			http.Error(w, "Failed to create lab test", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Lab test created successfully\n"))
	}
}

// UpdateLabTestHandler updates an existing lab test.
func UpdateLabTestHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		testID := vars["id"]

		var test models.LabTest
		if err := json.NewDecoder(r.Body).Decode(&test); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		test.ID = testID
		err := db.UpdateLabTest(&test)
		if err != nil {
			http.Error(w, "Failed to update lab test", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Lab test updated successfully\n"))
	}
}

// GetWomenHealthTestsHandler retrieves all women's health tests from the database.
func GetWomenHealthTestsHandler(db *database.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tests, err := db.GetLabTestsByCategory("women_health")
		if err != nil {
			http.Error(w, "Failed to retrieve women's health tests", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tests)
	}
}
