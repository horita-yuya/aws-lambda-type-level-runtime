package cmd

import (
	"context"
	"io"
	"log/slog"
	"os"
	"os/exec"
	"strings"
)

func StartLoop() {
	api := LambdaRuntimeApi{}

	// _Handler from env
	handler := os.Getenv("_HANDLER")
	lambdaTaskRoot := os.Getenv("LAMBDA_TASK_ROOT")

	slog.LogAttrs(
		context.Background(),
		slog.LevelInfo,
		"Start Loop",
		slog.String("_HANDLER", handler),
		slog.String("LAMBDA_TASK_ROOT", lambdaTaskRoot),
	)

	for {
		invRes, err := api.GetInvocation()

		if err != nil {
			panic(err)
		}

		header := invRes.Header
		body, err := io.ReadAll(invRes.Body)

		if err != nil {
			panic(err)
		}

		requestId := header.Get("Lambda-Runtime-Aws-Request-Id")
		event := string(body)

		nodeRes, err := exec.Command("/opt/node", "/opt/compute-type-value.js", handler, event, lambdaTaskRoot).Output()

		if err != nil {
			panic(err)
		}

		_, err = api.PostResponse(requestId, strings.NewReader(string(nodeRes)))

		if err != nil {
			panic(err)
		}
	}
}
