package service

import (
	"context"
	"errors"

	"github.com/medorahealth/Medora/server/internal/model"
	"github.com/medorahealth/Medora/server/internal/repo"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrEmailExists        = errors.New("email already registered")
)

type UserService interface {
	Register(ctx context.Context, name, email, password string) (*model.User, error)
	Login(ctx context.Context, email, password string) (*model.User, error)
}

type userService struct {
	repo repo.UserRepository
}

func NewUserService(repo repo.UserRepository) UserService {
	return &userService{repo: repo}
}

func (s *userService) Register(ctx context.Context, name, email, password string) (*model.User, error) {
	// check if email exists
	existing, err := s.repo.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if existing != nil {
		return nil, ErrEmailExists
	}

	// hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &model.User{
		Name:     name,
		Email:    email,
		Password: string(hashed),
	}

	if err := s.repo.Create(ctx, user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *userService) Login(ctx context.Context, email, password string) (*model.User, error) {
	user, err := s.repo.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, ErrInvalidCredentials
	}

	// compare password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, ErrInvalidCredentials
	}

	return user, nil
}
