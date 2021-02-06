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

TEST UI Components
https://codesandbox.io/s/financial-planner-ybkhv?file=/src/Components/Card.js

# cdk-python

cdk init app --language python
python -m pip install -r requirements.txt
source .venv/bin/activate
