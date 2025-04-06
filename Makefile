# Version information
VERSION=dev

# Declare phony targets	
.PHONY: init clean build build-frontend build-all

# Initialize the project
init:
	go mod tidy
	go mod download
	go mod verify
	cd www && npm install
	cd www && npm run build

# Clean build artifacts
clean:
	rm -rf bin

# Build backend services
build: clean
	go build -ldflags "-s -w -X main.version=$(VERSION)" -trimpath -o bin/server cmd/server/main.go
	go build -ldflags "-s -w -X main.version=$(VERSION)" -trimpath -o bin/scheduler cmd/scheduler/main.go

# Build frontend assets
build-frontend:
	cd www && npm run build

# Build everything
build-all: build-frontend build
