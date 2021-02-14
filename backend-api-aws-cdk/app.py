#!/usr/bin/env python3

from aws_cdk import core
from aws_cdk.core import Stack

from app_sync_cdk.app_sync_cdk_stack import AppSyncCdkStack
from dynamodb_lambda.dynamodb_lambda_stack import DynamodbLambdaStack
from pipeline.pipeline_stack import MyPipelineStack
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)
AWS_ACCT = os.getenv("AWS_ACCT")

app = core.App()
import os
from dotenv import load_dotenv
import aws_cdk.aws_secretsmanager as sm

load_dotenv(verbose=True)
secret_arn = os.getenv("SECRET_ARN")


class SecretsManagerStack(Stack):
    def __init__(self, scope: app, id: str, **kwargs):
        super().__init__(scope, name, **kwargs)

        secret = sm.Secret.from_secret_attributes(
            self,
            "ImportedSecret",
            secret_arn=secret_arn,
            # If the secret is encrypted using a KMS-hosted CMK, either import or reference that key:
            # encryption_key=....
        )


# class MyApplication(Stage):
#     def __init__(self, scope: Construct, id: str, **kwargs):
#         super().__init__(scope, id, **kwargs)

#         db_stack = DatabaseStack(self, "Database")
#         ComputeStack(self, "Compute", table=db_stack.table)


DynamodbLambdaStack(app, "dynamodb-lambda")
AppSyncCdkStack(app, "AppSyncGraphQLDynamoDBExample")

MyPipelineStack(
    app, "pipeline", env=core.Environment(account=AWS_ACCT, region="us-east-1")
)
app.synth()
