locals {
  # Type-Level Runtime
  runtime_name = "tlrt"
}

resource "aws_lambda_layer_version" "tlrt" {
  layer_name = local.runtime_name
  filename   = "${path.module}/${local.runtime_name}.zip"
}

data "archive_file" "lambda" {
  type        = "zip"
  output_path = "${path.module}/${local.runtime_name}.zip"

  source_dir = "${path.module}/runtime"
}