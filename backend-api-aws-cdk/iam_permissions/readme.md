arn:aws:iam::463443149614:role/cdk-hnb659fds-image-publishing-role-463443149614-us-east-1
Elastic Container Registry
Limited: List, Read, Write

arn:aws:iam::463443149614:role/cdk-hnb659fds-cfn-exec-role-463443149614-us-east-1
ADMIN

arn:aws:iam::463443149614:role/cdk-hnb659fds-deploy-role-463443149614-us-east-1
{
"Version": "2012-10-17",
"Statement": [
{
"Action": [
"cloudformation:CreateChangeSet",
"cloudformation:DeleteChangeSet",
"cloudformation:DescribeChangeSet",
"cloudformation:DescribeStacks",
"cloudformation:ExecuteChangeSet",
"s3:GetObject*",
"s3:GetBucket*",
"s3:List*",
"s3:Abort*",
"s3:DeleteObject*",
"s3:PutObject*",
"kms:Decrypt",
"kms:DescribeKey",
"kms:Encrypt",
"kms:ReEncrypt*",
"kms:GenerateDataKey*"
],
"Resource": "_",
"Effect": "Allow"
},
{
"Action": "iam:PassRole",
"Resource": "arn:aws:iam::463443149614:role/cdk-hnb659fds-cfn-exec-role-463443149614-us-east-1",
"Effect": "Allow"
},
{
"Action": [
"cloudformation:DescribeStackEvents",
"cloudformation:GetTemplate",
"cloudformation:DeleteStack",
"cloudformation:UpdateTerminationProtection",
"sts:GetCallerIdentity"
],
"Resource": "_",
"Effect": "Allow",
"Sid": "CliPermissions"
},
{
"Action": [
"ssm:GetParameter"
],
"Resource": [
"arn:aws:ssm:us-east-1:463443149614:parameter/cdk-bootstrap/hnb659fds/version"
],
"Effect": "Allow",
"Sid": "ReadVersion"
}
]
}

arn:aws:iam::463443149614:role/cdk-hnb659fds-file-publishing-role-463443149614-us-east-1
{
"Version": "2012-10-17",
"Statement": [
{
"Action": [
"s3:GetObject*",
"s3:GetBucket*",
"s3:List*",
"s3:DeleteObject*",
"s3:PutObject*",
"s3:Abort*"
],
"Resource": [
"arn:aws:s3:::cdk-hnb659fds-assets-463443149614-us-east-1",
"arn:aws:s3:::cdk-hnb659fds-assets-463443149614-us-east-1/*"
],
"Effect": "Allow"
},
{
"Action": [
"kms:Decrypt",
"kms:DescribeKey",
"kms:Encrypt",
"kms:ReEncrypt*",
"kms:GenerateDataKey*"
],
"Resource": "arn:aws:kms:us-east-1:463443149614:key/AWS_MANAGED_KEY",
"Effect": "Allow"
}
]
}
