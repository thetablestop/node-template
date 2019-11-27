# Node Template

Use this as a starting point for a node express app.

## Install

```
gcloud source repos clone node-template --project=thetablestop
cd node-template
yarn
```

## Run

```
yarn start
```

## Publish

```
gcloud config set project thetablestop
gcloud builds submit --tag gcr.io/thetablestop/<APP_NAME>
gcloud run deploy <APP_NAME> --image gcr.io/thetablestop/<APP_NAME>:latest --platform managed --region us-central1 --allow-unauthenticated
```
