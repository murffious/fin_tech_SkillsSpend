#!/usr/bin/env python3

from aws_cdk import core

from dynamodb_lambda.dynamodb_lambda_stack import DynamodbLambdaStack
from pipeline.pipeline_stack import MyPipelineStack
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)
AWS_ACCT = os.getenv("AWS_ACCT")

app = core.App()


# class MyApplication(Stage):
#     def __init__(self, scope: Construct, id: str, **kwargs):
#         super().__init__(scope, id, **kwargs)

#         db_stack = DatabaseStack(self, "Database")
#         ComputeStack(self, "Compute", table=db_stack.table)


DynamodbLambdaStack(app, "dynamodb-lambda")
MyPipelineStack(
    app, "pipeline", env=core.Environment(account=AWS_ACCT, region="us-east-1")
)
app.synth()
