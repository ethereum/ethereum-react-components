#!/bin/bash

# Git config
git config --global user.email "mist@ethereum.org" &&
git config --global user.name "Mist-bot"

# NPM config
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

# Commits to /docs (github pages)
if [[ (git status --porcelain | wc -l) -gt 0 ]]; then
  git add docs;
  git commit -am 'Updating github pages [ci skip]';
  git push origin $BRANCH;
fi

# Bumps package.json, commits and publishes to npm
yarn run standard-version --message='chore(release): %s [ci skip]'

# Pushes changes back to the repository
git push --follow-tags origin $BRANCH

# Publishes npm module
npm publish

