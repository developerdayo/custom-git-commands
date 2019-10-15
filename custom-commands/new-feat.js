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
                chalk.yellow(`Fetch Successful! Creating new feature branch from branch '${prod}'...`)
            );
            simpleGitPromise.raw([
                'checkout',
                '-b',
                `feature/${args}`,
                `${prod}`
            ])
            .then(
                (successCommit) => {
                    console.log(
                        chalk.yellow(`Success! Checked out 'feature/${args}'.`)
                    );
                    console.log(
                        chalk.blueBright(`You are now on feature/${args}.`)
                    );
                }, (failed) => {
                    console.log(
                        chalk.red(
                            `Failed to create new feature branch! This happen because:
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