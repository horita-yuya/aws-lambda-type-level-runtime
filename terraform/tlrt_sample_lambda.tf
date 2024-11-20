locals {
  # Type Level Runtime
  runtime_name = "tlrt"
}

resource "aws_lambda_function" "sample" {
  function_name = "${local.runtime_name}-sample"
  role          = aws_iam_role.sample.arn

  runtime  = "provided.al2023"
  handler  = "${local.runtime_name}_sample_index.SampleHandler"
  filename = "${path.module}/index.zip"

  layers = [
    aws_lambda_layer_version.tlrt.arn,
  ]

  timeout = 600
}

resource "aws_iam_role" "sample" {
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "archive_file" "sample" {
  type        = "zip"
  source_file = "${path.module}/${local.runtime_name}_sample_index.ts"
  output_path = "/tmp/index.zip"
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "logging" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_role_policy" "logging" {
  role   = aws_iam_role.sample.id
  policy = data.aws_iam_policy_document.logging.json
}