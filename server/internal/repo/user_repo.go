// repo/user_repository.go
package repo

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/medorahealth/Medora/server/internal/model"
)

// Interface
type UserRepository interface {
	Create(ctx context.Context, user *model.User) error
	FindByEmail(ctx context.Context, email string) (*model.User, error)
}

// Concrete implementation
type userRepository struct {
	db *pgxpool.Pool
}

// Constructor returns the interface
func NewUserRepository(db *pgxpool.Pool) UserRepository {
	return &userRepository{db: db}
}

// Implementation of methods
func (r *userRepository) Create(ctx context.Context, user *model.User) error {
	_, err := r.db.Exec(ctx,
		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
		user.Name, user.Email, user.Password,
	)
	return err
}

func (r *userRepository) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	row := r.db.QueryRow(ctx,
		"SELECT id, name, email, password FROM users WHERE email=$1", email,
	)

	u := &model.User{}
	if err := row.Scan(&u.ID, &u.Name, &u.Email, &u.Password); err != nil {
		return nil, err
	}

	return u, nil
}
