// internal/models/models.go
package models

import "time"

// This file ensures the models package is properly initialized
// All model structs are defined in their respective files

// User represents a user in the system
type User struct {
	ID        string    `json:"id,omitempty"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email"`
	Password  string    `json:"password,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// LabTest represents a laboratory test that can be ordered
type LabTest struct {
	ID          string    `json:"id,omitempty"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	SampleType  string    `json:"sampleType"`
	Turnaround  string    `json:"turnaround"`
	Category    string    `json:"category"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	Inventory   int       `json:"inventory"`
}

// Order represents a user's order for lab tests
type Order struct {
	ID          string      `json:"id,omitempty"`
	UserID      string      `json:"userID"`
	Items       []OrderItem `json:"items"`
	TotalAmount float64     `json:"totalAmount"`
	OrderStatus string      `json:"orderStatus"`
	PaymentID   string      `json:"paymentID,omitempty"`
	CreatedAt   time.Time   `json:"createdAt"`
	UpdatedAt   time.Time   `json:"updatedAt"`
}

// OrderItem represents a single item in an order
type OrderItem struct {
	LabTestID string  `json:"labTestID"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}
