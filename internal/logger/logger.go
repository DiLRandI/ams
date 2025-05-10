package logger

import (
	"log/slog"
	"os"
)

func InitLogger() *slog.Logger {
	// Create a structured logger with OpenTelemetry compatible fields
	opts := &slog.HandlerOptions{
		Level:     slog.LevelInfo,
		AddSource: true,
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			// Could customize attribute handling here for OTEL
			return a
		},
	}

	handler := slog.NewJSONHandler(os.Stdout, opts)
	logger := slog.New(handler)
	slog.SetDefault(logger)

	return logger
}
