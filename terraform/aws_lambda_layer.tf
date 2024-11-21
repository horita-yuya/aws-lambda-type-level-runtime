locals {
  # Type-Level Runtime
  runtime_name = "tlrt"
}

resource "aws_lambda_layer_version" "tlrt" {
  layer_name = local.runtime_name
  filename   = data.archive_file.lambda.output_path

  source_code_hash = data.archive_file.lambda.output_base64sha256
}

data "archive_file" "lambda" {
  type        = "zip"
  output_path = "${path.module}/${local.runtime_name}.zip"

  source_dir = "${path.module}/runtime"
}