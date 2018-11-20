#!/bin/bash

### 1. Github Pages

# Git config
git config --global user.email "mist@ethereum.org" &&
git config --global user.name "Mist-bot"

# Commits to /docs (github pages)
export FILES_CHANGED=`git status ./docs --untracked-files=no --porcelain | wc -l`
if [[ $FILES_CHANGED -gt 0 ]]; then
  git add docs;
  git commit -am 'Updating github pages [ci skip]';
  git push origin $BRANCH;
fi


### 2. NPM publishing

# NPM config
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

# Bumps package.json, commits and publishes to npm
yarn run standard-version --message='chore(release): %s [ci skip]'

# Pushes changes back to the repository
git push --follow-tags origin $BRANCH

# Publishes npm module
npm publish

