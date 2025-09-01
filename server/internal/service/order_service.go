
// internal/service/order_service.go
package service

import (
	"github.com/medorahealth/Medora/server/internal/model"
	"github.com/medorahealth/Medora/server/internal/repo"
	"context"
	"errors"
)

type OrderService struct {
	repo *repo.OrderRepo
}

func NewOrderService(r *repo.OrderRepo) *OrderService {
	return &OrderService{repo: r}
}

func (s *OrderService) CreateOrder(ctx context.Context, order *model.Order) error {
	if len(order.Items) == 0 {
		return ErrEmptyOrder
	}
	return s.repo.Create(ctx, order)
}

func (s *OrderService) GetOrder(ctx context.Context, orderID, userID string) (*model.Order, error) {
	return s.repo.Get(ctx, orderID, userID)
}

func (s *OrderService) UpdateOrderStatus(ctx context.Context, orderID, status string) error {
	// Add more business logic like checking allowed statuses
	return s.repo.UpdateStatus(ctx, orderID, status)
}

var (
	ErrEmptyOrder = errors.New("order must contain at least one item")
)
