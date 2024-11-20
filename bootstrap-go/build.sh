#!/bin/sh

GOOS=linux GOARCH=amd64 go build -o build/bootstrap main.go