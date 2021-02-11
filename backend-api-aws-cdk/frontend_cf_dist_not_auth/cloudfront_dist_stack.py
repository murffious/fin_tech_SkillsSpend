import aws_cdk.aws_cloudfront as cloudfront
import aws_cdk.aws_cloudfront_origins as origins

# Creates a distribution for a S3 bucket.
my_bucket = s3.Bucket(self, "myBucket")
cloudfront.Distribution(
    self, "myDist", default_behavior=BehaviorOptions(origin=origins.S3Origin(my_bucket))
)

classaws_cdk.aws_cloudfront.Distribution(scope, id, *, default_behavior, additional_behaviors=None, certificate=None, comment=None, default_root_object=None, domain_names=None, enabled=None, enable_ipv6=None, enable_logging=None, error_responses=None, geo_restriction=None, http_version=None, log_bucket=None, log_file_prefix=None, log_includes_cookies=No

# https://docs.aws.amazon.com/cdk/api/latest/python/aws_cdk.aws_cloudfront/Distribution.html?highlight=distribution#aws_cdk.aws_cloudfront.Distribution