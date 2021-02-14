import aws_cdk.aws_cloudfront as cloudfront
import aws_cdk.aws_cloudfront_origins as origins
aws_cdk.aws_s3

# Creates a distribution for a S3 bucket.
my_bucket = s3.Bucket(self, "myBucket")
cloudfront.Distribution(
    self, "myDist", default_behavior=BehaviorOptions(origin=origins.S3Origin(my_bucket))
)

classaws_cdk.aws_cloudfront.Distribution(scope, id, *, default_behavior, additional_behaviors=None, certificate=None, comment=None, default_root_object=None, domain_names=None, enabled=None, enable_ipv6=None, enable_logging=None, error_responses=None, geo_restriction=None, http_version=None, log_bucket=None, log_file_prefix=None, log_includes_cookies=No

# https://docs.aws.amazon.com/cdk/api/latest/python/aws_cdk.aws_cloudfront/Distribution.html?highlight=distribution#aws_cdk.aws_cloudfront.Distribution
# https://docs.aws.amazon.com/cdk/api/latest/docs/core-readme.html#stack-outputs


new CfnOutput(this, 'OutputName', {
  value: myBucket.bucketName,
  description: 'The name of an S3 bucket', // Optional
  exportName: 'TheAwesomeBucket', // Registers a CloudFormation export named "TheAwesomeBucket"
});

# OUTPUTS and sharing 
# I have a resource which is a cloudfront dist id in StackA
new cdk.CfnOutput(this, 'cloudfront-dist-id-output', {
      description: 'cloudfront-dist-id-output',
      exportName: 'cloudfront-dist-id-output',
      value: cloudFrontDistribution.distributionId
    });

# Stack B needs the DistributionId (it's dynamic), so I pass it in as a parameter.
new StackB(app, 'StackB', Fn.importValue('cloudfront-dist-id-output'));