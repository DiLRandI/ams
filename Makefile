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
build:
	go build -v -ldflags "-s -w -X main.version=$(VERSION)" -trimpath -o bin/server cmd/server/main.go

# Build frontend assets
build-frontend:
	cd www && npm run build
	cd -
	cp -r www/dist bin/web

# Build everything
build-all:clean build build-frontend
	@echo "--------------------------------"
	@echo "Build complete. You can find the binaries in the bin directory."
	@echo "To run the server, use: ./bin/server"
	@echo "To run the frontend, use: cd bin/web && python3 -m http.server 8000"
	@echo "Then open your browser and go to http://localhost:8000"
	@echo "--------------------------------"