#!/bin/bash

git config --global user.email "builds@travis-ci.com"
git config --global user.name "Travis CI"
git remote add tagorigin https://$GH_USERNAME:$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git
git tag $FULL_VERSION -a -m "Generated tag from TravisCI for build $TRAVIS_BUILD_NUMBER"
git push tagorigin --tags
