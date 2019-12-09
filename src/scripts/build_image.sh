#!/bin/bash

export FULL_VERSION=$VERSION_PREFIX.$TRAVIS_BUILD_NUMBER
export REPO_TAGGED=$TRAVIS_REPO_SLUG:$FULL_VERSION
export REPO_LATEST=$TRAVIS_REPO_SLUG:latest
echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t $REPO_TAGGED .
