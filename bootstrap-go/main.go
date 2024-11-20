package main

import (
	"github.com/horita-yuya/tlrt/cmd"
	"log/slog"
	"os"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)
	cmd.StartLoop()
}
