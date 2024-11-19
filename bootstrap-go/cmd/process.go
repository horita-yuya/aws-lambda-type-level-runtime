package cmd

import (
	"fmt"
	"io"
	"log/slog"
	"os"
	"os/exec"
	"strings"
)

func RunProcess() {
	api := LambdaRuntimeApi{}

	// _Handler from env
	handler := os.Getenv("_HANDLER")
	lambdaTaskRoot := os.Getenv("LAMBDA_TASK_ROOT")

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

	slog.Debug("Request ID: %s", requestId)
	slog.Debug("Event: %v", event)

	nodeRes, err := exec.Command("/opt/node-v20.18.0-linux-x64/bin/node", "/opt/index.js", handler, event, lambdaTaskRoot).Output()

	if err != nil {
		panic(err)
	}

	nodeResStr := string(nodeRes)

	jsonStr := fmt.Sprintf("{ \"result\": %s }", nodeResStr)
	postRes, err := api.PostResponse(requestId, strings.NewReader(jsonStr))

	if err != nil {
		panic(err)
	}

	slog.Debug("Post Response: %v", postRes)
}
