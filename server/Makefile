# Load environment variables from .env file
include .env
export $(shell sed 's/=.*//' .env)

# Database URL
DB_URL=$(DATABASE_URL)
MIGRATIONS_PATH=./migrations

## Create a new migration
migrate-new:
	@migrate create -ext sql -dir $(MIGRATIONS_PATH) $(name)

## Apply all migrations
migrate-up:
	@migrate -path $(MIGRATIONS_PATH) -database "$(DB_URL)" up

## Rollback last migration
migrate-down:
	@migrate -path $(MIGRATIONS_PATH) -database "$(DB_URL)" down 1

## Force a specific migration version (be careful!)
migrate-force:
	@migrate -path $(MIGRATIONS_PATH) -database "$(DB_URL)" force $(version)

## Show help
help:
	@echo "make migrate-new name=add_phone_to_users  -> Create a new migration"
	@echo "make migrate-up                          -> Apply all migrations"
	@echo "make migrate-down                        -> Rollback last migration"
	@echo "make migrate-force version=<N>           -> Force DB to specific version"
