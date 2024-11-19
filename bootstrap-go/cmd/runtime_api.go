package cmd

import (
	"io"
	"net/http"
	"os"
)

type LambdaRuntimeApi struct {
}

// AWS_LAMBDA_RUNTIME_API is an environment variable that is set by the Lambda service.
var baseUrl = "http://" + os.Getenv("AWS_LAMBDA_RUNTIME_API") + "/2018-06-01"

func (api *LambdaRuntimeApi) GetInvocation() (*http.Response, error) {
	path := "/runtime/invocation/next"
	return http.Get(baseUrl + path)
}

func (api *LambdaRuntimeApi) PostResponse(requestId string, body io.Reader) (*http.Response, error) {
	path := "/runtime/invocation/" + requestId + "/response"
	return http.Post(baseUrl+path, "application/json", body)
}
