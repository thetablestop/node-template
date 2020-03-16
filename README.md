# Node Template

[![Build Status](https://travis-ci.org/thetablestop/node-template.svg?branch=master)](https://travis-ci.org/thetablestop/node-template)

Use this as a starting point for a node express app.

## Install

```
git clone git@github.com:thetablestop/node-template.git
cd node-template
yarn
```

## Run

```
yarn start
```

## CI/CD

### Build

-   The repository must first be added in [Travis CI](https://travis-ci.org/organizations/thetablestop/repositories)

-   Update `.travis.yml` to configure build. Most things will be able to be left as is, but the secure values will have to be replaced with the following [Travis CLI](https://github.com/travis-ci/travis.rb) commands:

```
travis encrypt GH_USERNAME={YOUR USERNAME} --add env.global
travis encrypt GH_TOKEN={YOUR PASSWORD} --add env.global
travis encrypt DOCKER_USERNAME={YOUR USERNAME} --add env.global
travis encrypt DOCKER_TOKEN={YOUR PASSWORD} --add env.global
travis encrypt "thetablestop:{SLACK WEBHOOK TOKEN}" --add notifications.slack
travis env set KUBE_CONFIG $(cat ~/.kube/configs/kubeconfig.yaml | base64 -w0)
```

-   NOTE: It is recommended to generate an Personal Access Token in [DockerHub](https://hub.docker.com/settings/security) and [GitHub](https://github.com/settings/tokens) rather than entering the exact password.
