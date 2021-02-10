import boto3
from botocore.exceptions import ParamValidationError
import json
import decimal
import os

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Content-Type": "application/json",
}

DYNAMO_DB = boto3.resource("dynamodb")
DYNAMO_DB_TABLE = DYNAMO_DB.Table(os.getenv("DYNAMO_DB_TABLE"))


def create_bill(*args, body, **kwargs):
    print("Creating Bill")

    try:
        response = DYNAMO_DB_TABLE.put_item(Item=body)
        print("res:", response)

        return {
            "statusCode": 201,
            "body": json.dumps({"data": "Bill created"}),
            "headers": CORS_HEADERS,
        }

    except ParamValidationError as e:
        print(e)
        return {"statusCode": 400, "body": "Malformed data", "headers": CORS_HEADERS}
