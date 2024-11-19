resource "aws_lambda_function" "sample" {
  function_name = "tlrt-sample"
  role          = data.aws_iam_policy_document.assume_role.json

  runtime = "provided.al2023"
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