from aws_cdk.core import Stack, StackProps, Construct, SecretValue
from aws_cdk.pipelines import CdkPipeline, SimpleSynthAction

import aws_cdk.aws_codepipeline as codepipeline
import aws_cdk.aws_codepipeline_actions as codepipeline_actions
from aws_cdk.aws_codepipeline_actions import ManualApprovalAction

# import os
# from dotenv import load_dotenv

# load_dotenv(verbose=True)
# GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")


class MyPipelineStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        source_artifact = codepipeline.Artifact()
        cloud_assembly_artifact = codepipeline.Artifact()

        pipeline = CdkPipeline(
            self,
            "Pipeline",
            pipeline_name="MyAppPipeline",
            cloud_assembly_artifact=cloud_assembly_artifact,
            source_action=codepipeline_actions.GitHubSourceAction(
                action_name="GitHub",
                output=source_artifact,
                oauth_token=SecretValue.secrets_manager("GITHUB_TOKEN"),
                trigger=codepipeline_actions.GitHubTrigger.POLL,
                # Replace these with your actual GitHub project info
                owner="murffious",
                repo="fin_tech_SkillsSpend",
                branch="main",
            ),
            synth_action=SimpleSynthAction.standard_npm_synth(
                source_artifact=source_artifact,
                cloud_assembly_artifact=cloud_assembly_artifact,
                # Use this if you need a build step (if you're not using ts-node
                # or if you have TypeScript Lambdas that need to be compiled).
                # build_command="npm run build",
            ),
        )

        # Do this as many times as necessary with any account and region
        # # Account and region may different from the pipeline's.
        # pipeline.add_application_stage(
        #     MyApplication(
        #         self,
        #         "Prod",
        #         env=Environment(account="123456789012", region="eu-west-1"),
        #     )
        # )
        # testing_stage = pipeline.add_application_stage(
        #     MyApplication(
        #         self,
        #         "Testing",
        #         env=Environment(account="111111111111", region="eu-west-1"),
        #     )
        # )

        # # Add an action -- in this case, a Manual Approval action
        # # (testingStage.addManualApprovalAction() is an equivalent convenience method)
        # testing_stage.add_actions(
        #     ManualApprovalAction(
        #         action_name="ManualApproval",
        #         run_order=testing_stage.next_sequential_run_order(),
        #     )
        # )
