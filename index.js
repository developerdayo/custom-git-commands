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
    chalk.cyanBright(
`
prod: ${prod}
stage: ${stage}
dev: ${dev}
`
    )
)
console.log(
    chalk.blue(
`
Available Commands (ctek-cmds):
• new-feat: create a new feat branch. requires a name (ex: new-feat myBranch).
• new-bug: create a new bug branch. requires a name (ex: new-bug myBranch).
• new-hotfix: create a new hotfix branch. requires a name (ex: new-hotfix myBranch).
• deploy-dev: deploys to dev environment. requires branch name (ex: deploy-dev feature/myBranch).
• deploy-stage: deploys to stage environment. requires branch name (ex: deploy-stage feature/myBranch).
`
    )
);