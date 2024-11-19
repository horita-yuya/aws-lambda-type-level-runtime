# aws-lambda-type-level-runtime

tlrt is a custom runtime for AWS Lambda that allows you to write lambda function in type level programming.

tlrt is composed of three components:
1. entrypoint
This is a entrypoint called by AWS Lambda. It reads the input from the event and pass it to the handler.

2. compute-type-value
This reads your handler and compute the value of the handler.

3. lambda-layer (terraform)
To use the above components, you need to create a lambda layer. This terraform module creates a lambda layer for you.