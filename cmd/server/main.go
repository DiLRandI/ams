package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// LoginRequest represents the login request payload
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResponse represents the login response payload
type LoginResponse struct {
	Success bool   `json:"success"`
	Token   string `json:"token,omitempty"`
	Message string `json:"message,omitempty"`
}

func main() {
	// Get the absolute path to the www/build directory
	buildDir := filepath.Join("www", "build")
	
	// Check if the build directory exists
	if _, err := os.Stat(buildDir); os.IsNotExist(err) {
		log.Fatal("React build directory not found. Please run 'npm run build' in the www directory first.")
	}

	// Create a file server handler
	fs := http.FileServer(http.Dir(buildDir))

	// Handle login endpoint
	http.HandleFunc("/api/v1/login", func(w http.ResponseWriter, r *http.Request) {
		// Only allow POST method
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Parse request body
		var loginReq LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Hardcoded credentials check
		if loginReq.Email == "admin" && loginReq.Password == "admin" {
			// Successful login
			response := LoginResponse{
				Success: true,
				Token:   "dummy-token-123", // In a real app, this would be a JWT or similar
				Message: "Login successful",
			}
			
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(response)
			log.Printf("Login successful for user: %s", loginReq.Email)
		} else {
			// Failed login
			response := LoginResponse{
				Success: false,
				Message: "Invalid credentials",
			}
			
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(response)
			log.Printf("Login failed for user: %s", loginReq.Email)
		}
	})

	// Handle all routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Try to serve the requested file
		_, err := os.Stat(filepath.Join(buildDir, r.URL.Path))
		if os.IsNotExist(err) {
			// If the file doesn't exist, serve index.html for client-side routing
			log.Printf("Route not found: %s, serving index.html for client-side routing", r.URL.Path)
			http.ServeFile(w, r, filepath.Join(buildDir, "index.html"))
			return
		}
		log.Printf("Serving file: %s", r.URL.Path)
		fs.ServeHTTP(w, r)
	})

	// Start the server
	port := ":8080"
	log.Printf("Server starting on http://localhost%s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
	