#!/bin/bash

docker tag $REPO_TAGGED $REPO_LATEST
docker push $REPO_TAGGED
docker push $REPO_LATEST