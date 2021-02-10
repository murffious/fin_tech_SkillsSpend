#!/usr/bin/env python3

from aws_cdk import core

from dynamodb_lambda.dynamodb_lambda_stack import DynamodbLambdaStack
from pipeline.pipeline_stack import MyPipelineStack

app = core.App()
DynamodbLambdaStack(app, "dynamodb-lambda")
MyPipelineStack(
    app, "my-pipeline", env=core.Environment(account="111111111111", region="eu-west-1")
)
app.synth()
