#!/usr/bin/env node

const simpleGit = require('simple-git')();
const simpleGitPromise = require('simple-git/promise')();
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const envBranchNames = require('./custom-commands/env-branch-names');
const env = envBranchNames.envBranchNames;

const dev = env.dev;
const stage = env.stage;
const prod = env.prod;

console.log(
    chalk.yellow(
        figlet.textSync('Git Commands', {horizontalLayout: 'full'})
    )
);

console.log(
    chalk.blue(
        `
        prod: ${prod}
        stage: ${stage}
        dev: ${dev}

        Available Commands:
        • node new-feat: create a new feat branch. requires a name.
        • node new-bug: create a new bug branch. requires a name.
        • node new-hotfix: create a new hotfix branch. requires a name.
        • node dt-dev: deploys to dev environment. requires branch name.
        • node dt-stage: deploys to stage environment. requires branch name.
        `
    )
);