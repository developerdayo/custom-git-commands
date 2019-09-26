const chalk = require('chalk');
const simpleGit = require('simple-git')();
const simpleGitPromise = require('simple-git/promise')();

const envBranchNames = require('./env-branch-names');
const env = envBranchNames.envBranchNames;

const dev = env.dev;
const stage = env.stage;
const prod = env.prod;

function init() {
    simpleGitPromise.checkout(dev)
    .then(
        (successCommit) => {
            console.log(
                chalk.yellow(`checked out ${dev}`)
            );
        }, (failed) => {
            console.log('failed');

    });
}
init();