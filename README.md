# fin_tech_SkillsSpend

PURPOSE: finance app that actually makes sense

###### Bleeding Edge Tech Stack

AWS --> architecture
aws-cdk.aws-ec2
aws-cdk.aws-autoscaling
aws-cdk.aws-elasticloadbalancingv2
aws-cdk.aws-rds
aws-cdk.aws-efs

CD/CI - CDK Pipelines [https://docs.aws.amazon.com/cdk/api/latest/docs/pipelines-readme.html]
Docker
OAUTH2/OKTA, PLAID
SQL
React Server Components - [https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html]
Swagger
Tailwind - [https://tailwindcss.com/docs/guides/create-react-app]

# docker

`docker ps` = status of running containers
`docker paste_id stop` = stop a container
`docker compose up` = build / run containers
`docker compose up -d` = build / run containers in background
`docker compose - - build` = rebuild after updating code
`docker compose down` = stop all containers in background
`docker-compose exec notes-app npm run seed` = Run seed script
ex: `docker run -d -p 80:80 docker/getting-started`
TEST UI Components
https://codesandbox.io/s/financial-planner-ybkhv?file=/src/Components/Card.js

# cdk-python

update cdk
npm update -g aws-cdk
pip install --upgrade -r requirements.txt
https://docs.aws.amazon.com/cdk/latest/guide/troubleshooting.html

init project
cdk init app --language python
python -m pip install -r requirements.txt
source .venv/bin/activate

# after updating requirements.txt

pip install --upgrade -r requirements.txt

add pipelines
python -m pip install aws_cdk.pipelines aws_cdk.aws_codebuild
python -m pip install aws_cdk.aws_codepipeline aws_cdk.aws_codepipeline_actions
https://docs.aws.amazon.com/cdk/latest/guide/cdk_pipeline.html

# swagger + testing suite maybe postman

host the swagger docs maybe in a fargate or something for jsut cause
