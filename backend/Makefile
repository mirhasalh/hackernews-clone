# Environment variables from .env
include .env
export $(shell sed 's/=.*//' .env)

# Run the Go backend
run:
	go run cmd/main.go

# Run migrations
migrate:
	go run migrate.go

# Start backend with live reload (requires Air)
dev:
	air

# Build the Go application
build:
	go build -o hackernews-backend cmd/main.go

# Start Docker containers
docker-up:
	docker-compose up -d

# Stop Docker containers
docker-down:
	docker-compose down

# Restart Docker containers
docker-restart: docker-down docker-up

# Clean build artifacts
clean:
	rm -f hackernews-backend

.PHONY: run migrate dev build docker-up docker-down docker-restart clean
