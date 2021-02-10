from botocore.exceptions import CLientError
from urllib.parse import unquote
import json

from finance import create_bill, delete_bill, get_bills, put_bill

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Content-Type": "application/json",
}