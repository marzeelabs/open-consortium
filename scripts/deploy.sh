#!/bin/bash

DEPLOY_FROM="master"
DEPLOY_TO="gh-pages"

# Do not deploy when building pull requests.
# If this build comes from an unmerged pull request, it will be ignored.
# In order to have automated deployemnts, you must have builds active on
# pushes (merges) in your Travis settings for the repo (Travis dashboard).
if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  echo "Skipping deployment: we do not deploy Pull Request test builds."
  exit 0
fi

# Only deploy from the configured branch
if [ $TRAVIS_BRANCH == $DEPLOY_FROM ]
then
  echo "Starting deployment from the $DEPLOY_FROM branch"
  echo "Target: $DEPLOY_TO branch"

  TEMP_DIRECTORY="/tmp/__temp_static_content"
  CURRENT_COMMIT=`git rev-parse HEAD`
  ORIGIN_URL=`git config --get remote.origin.url`
  ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}

  echo "Compile new static content."
  mkdir $TEMP_DIRECTORY || exit 1
  harp compile . $TEMP_DIRECTORY || exit 1
  cp .gitignore $TEMP_DIRECTORY || exit 1
  cp CNAME $TEMP_DIRECTORY || exit 1

  echo "Check out $DEPLOY_TO branch."
  git checkout -B $DEPLOY_TO || exit 1

  echo "Remove old static content."
  git rm -rf . || exit 1

  echo "Copy newly generated static content."
  cp -r $TEMP_DIRECTORY/* . || exit 1
  cp $TEMP_DIRECTORY/.gitignore . || exit 1

  echo "Push new content to $ORIGIN_URL."
  git config user.name "Travis CI" || exit 1
  git config user.email "travis@marzeelabs.org" || exit 1

  git add -A . || exit 1
  git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
  git push --force --quiet "$ORIGIN_URL_WITH_CREDENTIALS" $DEPLOY_TO > /dev/null 2>&1

  echo "Clen up temp files."
  rm -Rf $TEMP_DIRECTORY

  echo "Deployed successfully."
  exit 0
else
  echo "Skipping deployment: we only deploy from the $DEPLOY_FROM branch."
fi
