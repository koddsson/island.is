#!/bin/bash
set -euo pipefail

function main {
  echo "Fetching secret environment variables for $1"
  dir="${0%/*}"
  env_secret_file="$dir/../.env.secret"
  touch $env_secret_file

  if [ "${2-}" == "--reset" ]; then
    > $env_secret_file
  fi

  secrets=$(aws ssm get-parameters-by-path \
    --path "/k8s/$1/" --with-decryption --recursive \
    --parameter-filters Key=Label,Option=Equals,Values=dev \
    | npx jq -r '.Parameters | map(.Name |= split("/")) | .[] | [.Name[-1], .Value] | join("=")')

  for secret in $secrets; do
    echo "export $secret" >> $env_secret_file
  done

  echo "Done"
}

if [ -z ${1-} ]; then
  echo "Usage: AWS_PROFILE=<profile> secrets.sh <project> [--reset]"
  echo ""
  echo "Example:"
  echo "  AWS_PROFILE=islandis ./secrets.sh gjafakort --reset"
  exit 1
else
  main $*
fi