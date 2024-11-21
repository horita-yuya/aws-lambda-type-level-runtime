# How to use TLRT

1. Copy files to your project

You must copy at least the following files to your project:
- aws_lambda_layer.tf
- runtime

aws_lambda_layer.tf and runtime must be located in the same directory.

If you want to try an example, you can copy the following files:
- tlrt_sample_index.ts
- tlrt_sample_lambda.tf

These files also must be located in the same directory.

```shell
Your-Terraform-Project
├── aws_lambda_layer.tf
├── runtime
│   ├── bootstrap
│   ├── node
│   └── type-evaluate.js
├── tlrt_sample_index.ts (Optional)
└── tlrt_sample_lambda.tf (Optional)
```

```shell
terraform apply

aws lambda invoke --function-name tlrt-sample --payload '{"n1": 1, "n2": 2}' --cli-binary-format raw-in-base64-out /tmp/res.json && cat /tmp/res.json

Output:
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
{"result":"Received 1 and 2!"}
```

# TLRT Components

1. bootstrap

2. runtime
   1. bootstrap
   2. node
   3. type-evaluate.js