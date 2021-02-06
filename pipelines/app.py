#!/usr/bin/env python3

from aws_cdk import core

from pipelines.pipelines_stack import PipelinesStack


app = core.App()
PipelinesStack(app, "pipelines")

app.synth()
