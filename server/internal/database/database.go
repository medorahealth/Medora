// internal/database/database.go
package database

import (
	"context"
	"errors"
	"sync"
	"time"

	"backend/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB struct for in-memory storage
type DB struct {
	sync.RWMutex
	users        map[string]*models.User
	tests        map[string]*models.LabTest
	orders       map[string]*models.Order
	dbName       string
	client       *mongo.Client
	databaseName string
}

// ConnectDB initializes in-memory storage
func ConnectDB(mongoURI, dbName string) (*DB, error) {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		return nil, err
	}

	databaseName := client.Database(dbName).Name()

	return &DB{
		users:        make(map[string]*models.User),
		tests:        make(map[string]*models.LabTest),
		orders:       make(map[string]*models.Order),
		dbName:       dbName,
		client:       client,
		databaseName: databaseName,
	}, nil
}

// Disconnect is a no-op for in-memory storage
func (db *DB) Disconnect() error {
	return db.client.Disconnect(context.Background())
}

// GetAllLabTests returns all lab tests
func (db *DB) GetAllLabTests() ([]*models.LabTest, error) {
	db.RLock()
	defer db.RUnlock()

	tests := make([]*models.LabTest, 0, len(db.tests))
	for _, test := range db.tests {
		tests = append(tests, test)
	}
	return tests, nil
}

// GetLabTestByID returns a lab test by ID
func (db *DB) GetLabTestByID(id string) (*models.LabTest, error) {
	db.RLock()
	defer db.RUnlock()

	test, ok := db.tests[id]
	if !ok {
		return nil, errors.New("test not found")
	}
	return test, nil
}

// CreateLabTest creates a new lab test
func (db *DB) CreateLabTest(test *models.LabTest) error {
	db.Lock()
	defer db.Unlock()

	test.CreatedAt = time.Now()
	test.UpdatedAt = time.Now()
	db.tests[test.ID] = test
	return nil
}

// UpdateLabTest updates an existing lab test
func (db *DB) UpdateLabTest(test *models.LabTest) error {
	db.Lock()
	defer db.Unlock()

	if _, ok := db.tests[test.ID]; !ok {
		return errors.New("test not found")
	}
	test.UpdatedAt = time.Now()
	db.tests[test.ID] = test
	return nil
}

// CreateUser creates a new user
func (db *DB) CreateUser(user *models.User) error {
	db.Lock()
	defer db.Unlock()

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	db.users[user.ID] = user
	return nil
}

// GetUserByEmail returns a user by email
func (db *DB) GetUserByEmail(email string) (*models.User, error) {
	db.RLock()
	defer db.RUnlock()

	for _, user := range db.users {
		if user.Email == email {
			return user, nil
		}
	}
	return nil, errors.New("user not found")
}

// CreateOrder creates a new order
func (db *DB) CreateOrder(order *models.Order) error {
	db.Lock()
	defer db.Unlock()

	order.CreatedAt = time.Now()
	order.UpdatedAt = time.Now()
	db.orders[order.ID] = order
	return nil
}

// GetOrder returns an order by ID
func (db *DB) GetOrder(orderID string, userID string) (*models.Order, error) {
	db.RLock()
	defer db.RUnlock()

	order, ok := db.orders[orderID]
	if !ok || order.UserID != userID {
		return nil, errors.New("order not found")
	}
	return order, nil
}

// UpdateOrderStatus updates the status of an order
func (db *DB) UpdateOrderStatus(orderID string, status string) error {
	db.Lock()
	defer db.Unlock()

	order, ok := db.orders[orderID]
	if !ok {
		return errors.New("order not found")
	}
	order.OrderStatus = status
	order.UpdatedAt = time.Now()
	db.orders[orderID] = order
	return nil
}

// GetLabTestsByCategory retrieves all lab tests for a specific category
func (db *DB) GetLabTestsByCategory(category string) ([]models.LabTest, error) {
	collection := db.client.Database(db.databaseName).Collection("lab_tests")

	filter := bson.M{"category": category}
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var tests []models.LabTest
	if err = cursor.All(context.Background(), &tests); err != nil {
		return nil, err
	}

	return tests, nil
}
