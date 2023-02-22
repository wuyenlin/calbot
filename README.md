# CALBOT
This repository hosts a bot written in [Koa](https://koajs.com/) that responds to messages on [LINE messenger](https://line.me/en/) with appointments on Google Calendar by calling [Google Calendar API](https://developers.google.com/calendar/api/v3/reference).

## Getting started
Install dependencies:
```bash
npm install
```

Launch the app:
```bash
docker compose up
```
Now the endpoint is revealed at `http://localhost:3000`.
However, in order to use the endpoint as a webhook on LINE, it is mandatory to have an `https` link.

## Deployment
The docker image can be deployed to AWS [EC2](https://docs.aws.amazon.com/ec2/). 
Based on personal experiment, `t2.micro` tier is enough to host the project.

Binding it with [API Gateway](https://aws.amazon.com/api-gateway/) will then get you an `https` link.

## References
1. [LINE Developers](https://developers.line.biz/en/docs/messaging-api/nodejs-sample/)
2. [Google Calendar API](https://developers.google.com/calendar/api/v3/reference)