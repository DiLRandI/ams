package app

import (
	"log/slog"
	"net/http"
	"os"
	"strings"
)

type Config struct {
	WebRootPath string
}
type App struct {
	webRootPath string
}

func New(c *Config) *App {
	return &App{
		webRootPath: c.WebRootPath,
	}
}

func (a *App) InitRoutes(mux *http.ServeMux) error {
	slog.Info("Initializing routes")
	defer slog.Info("Routes initialized")

	execPath, err := os.Executable()
	if err != nil {
		slog.Error("Failed to get executable path", "error", err)
		return err
	}

	execPath = execPath[:strings.LastIndex(execPath, "/")]

	webRoot := execPath + "/" + a.webRootPath

	if _, err := os.Stat(webRoot); os.IsNotExist(err) {
		slog.Error("Web root path does not exist", "path", a.webRootPath)
		return err
	}

	slog.Info("Web root path", "path", webRoot)

	fs := http.FileServer(http.Dir(webRoot))
	mux.Handle("GET /", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Serving file", "path", r.URL.Path)
		fs.ServeHTTP(w, r)
	}))

	return nil
}
