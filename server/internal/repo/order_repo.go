
package repo

import (
	"github.com/medorahealth/Medora/server/internal/model"
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/google/uuid"
)

type OrderRepo struct {
	db *pgxpool.Pool
}

func NewOrderRepo(db *pgxpool.Pool) *OrderRepo {
	return &OrderRepo{db: db}
}

func (r *OrderRepo) Create(ctx context.Context, order *model.Order) error {
	order.ID = uuid.New().String()
	order.Status = "pending"
	order.CreatedAt = time.Now()
	order.UpdatedAt = time.Now()

	itemsJSON, err := json.Marshal(order.Items)
	if err != nil {
		return err
	}

	query := `INSERT INTO orders (id, user_id, items, status, created_at, updated_at)
			  VALUES ($1, $2, $3, $4, $5, $6)`

	_, err = r.db.Exec(ctx, query, order.ID, order.UserID, itemsJSON, order.Status, order.CreatedAt, order.UpdatedAt)
	return err
}

func (r *OrderRepo) Get(ctx context.Context, orderID, userID string) (*model.Order, error) {
	var o model.Order
	var itemsJSON []byte

	query := `SELECT id, user_id, items, status, created_at, updated_at 
			  FROM orders WHERE id=$1 AND user_id=$2`

	err := r.db.QueryRow(ctx, query, orderID, userID).Scan(
		&o.ID, &o.UserID, &itemsJSON, &o.Status, &o.CreatedAt, &o.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(itemsJSON, &o.Items); err != nil {
		return nil, err
	}

	return &o, nil
}

func (r *OrderRepo) UpdateStatus(ctx context.Context, orderID, status string) error {
	query := `UPDATE orders SET status=$1, updated_at=$2 WHERE id=$3`
	_, err := r.db.Exec(ctx, query, status, time.Now(), orderID)
	return err
}
