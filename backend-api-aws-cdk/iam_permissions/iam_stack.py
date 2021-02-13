# somehow this has to be separate to scale with a team and admin able to use it
import aws_cdk.aws_iam as iam

# aws_cdk.aws_iam.Role

# new Role(scope: Construct, id: string, props: RoleProps)

role = iam.Role(
    self, "TestRole", assumed_by=iam.ServicePrincipal("ec2.amazonaws.com")
)  # required

policy_document = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "FirstStatement",
            "Effect": "Allow",
            "Action": ["iam:ChangePassword"],
            "Resource": "*",
        },
        {
            "Sid": "SecondStatement",
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "*",
        },
        {
            "Sid": "ThirdStatement",
            "Effect": "Allow",
            "Action": ["s3:List*", "s3:Get*"],
            "Resource": [
                "arn:aws:s3:::confidential-data",
                "arn:aws:s3:::confidential-data/*",
            ],
            "Condition": {"Bool": {"aws:_multi_factor_auth_present": "true"}},
        },
    ],
}

custom_policy_document = iam.PolicyDocument.from_json(policy_document)

# You can pass this document as an initial document to a ManagedPolicy
# or inline Policy.
new_managed_policy = ManagedPolicy(
    stack, "MyNewManagedPolicy", document=custom_policy_document
)
new_policy = Policy(stack, "MyNewPolicy", document=custom_policy_document)
