#!/bin/bash
set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source $DIR/_common.sh

RUNNER=test-runner
APP_HOME=`cat $PROJECT_ROOT/workspace.json | jq ".projects[\"$APP\"].root" -r`

# Checking if we should simple run the test runner container or should we use a docker-compose setup
if [ -f $PROJECT_ROOT/$APP_HOME/docker-compose.ci.yml ]; then
  COMPOSE_FILES="-f $PROJECT_ROOT/$APP_HOME/docker-compose.ci.yml"
  
  if [ -f $PROJECT_ROOT/$APP_HOME/docker-compose.base.yml ]; then
    COMPOSE_FILES="-f $PROJECT_ROOT/$APP_HOME/docker-compose.base.yml $COMPOSE_FILES"
  fi

  # Cleanup after the test 
  clean_up () {
    if [ "$1" != "0" ]; then
      SUT=${DOCKER_REGISTRY}${RUNNER}:${DOCKER_TAG} docker-compose -p test-$APP $COMPOSE_FILES rm -s -f
      echo "Cleanup result for $APP is $? and exit code is $1"
      exit $1
    fi
  } 
  trap 'clean_up $? $LINENO' EXIT

  docker image inspect ${DOCKER_REGISTRY}${RUNNER}:${DOCKER_TAG} -f ' ' > /dev/null  2>&1 || \
    docker buildx build \
    --platform=linux/amd64 \
    --cache-from=type=local,src=$PROJECT_ROOT/cache \
    -f ${DIR}/Dockerfile \
    --target=test \
    --load \
    -t ${DOCKER_REGISTRY}${RUNNER}:${DOCKER_TAG} \
    $PROJECT_ROOT

  # Running the tests using docker-compose
  SUT=${DOCKER_REGISTRY}${RUNNER}:${DOCKER_TAG} docker-compose -p test-$APP $COMPOSE_FILES run --rm sut
else
  # Standalone execution of tests when no external dependencies are needed (DBs, queues, etc.)
  exec yarn run \
    test ${APP}

  # Docker based run, not used at the moment due to severe speed penalty
  # exec docker run \
  #   --rm \
  #   --net=host \
  #   -e APPLICATION_DB_HOST \
  #   -e APPLICATION_TEST_DB_USER \
  #   -e APPLICATION_TEST_DB_PASS \
  #   -e APPLICATION_TEST_DB_NAME \
  #   -e APP=$APP \
  #   ${DOCKER_REGISTRY}${RUNNER}:${DOCKER_TAG}
fi
