#!/usr/bin/env node

const chalk = require('chalk');
const simpleGit = require('simple-git')();
const simpleGitPromise = require('simple-git/promise')();

const envBranchNames = require('./env-branch-names');
const env = envBranchNames.envBranchNames;

const prod = env.prod;
const remotes = env.remotes;

function init(name) {
    const [,, ...args] = process.argv;
    console.log(
        chalk.yellow(`Pulling latest from '${prod}'...`)
    );
    simpleGitPromise.raw([
        'pull',
        `${remotes}`,
        `${prod}`,
    ])
    .then(
        (successFetch) => {
            console.log(
                chalk.yellow(`Pull Success! Creating new bug branch from branch '${prod}'...`)
            );
            simpleGitPromise.raw([
                'checkout',
                '-b',
                `bug/${args}`,
                `${prod}`
            ])
            .then(
                (successCommit) => {
                    console.log(
                        chalk.yellow(`Success! Checked out 'bug/${args}'.`)
                    );
                    console.log(
                        chalk.blueBright(`You are now on bug/${args}.`)
                    );
                }, (failed) => {
                    console.log(
                        chalk.red(
                            `Failed to create new bug branch! This happen because:
                            • you already have a local copy,
                            • you entered an invalid branch name,
                            • the branch names specified in env-branch-names.js need to be updated.`
                        )
                    );

            });
        }, (failed) => {
            console.log(
                chalk(
                    chalk.red(`Failed to get latest from ${prod}.`)
                )
            );
        }
    )
}
init();