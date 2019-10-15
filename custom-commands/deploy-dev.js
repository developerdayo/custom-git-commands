#!/usr/bin/env node

const chalk = require('chalk');
const simpleGit = require('simple-git')();
const simpleGitPromise = require('simple-git/promise')();

const envBranchNames = require('./env-branch-names');
const env = envBranchNames.envBranchNames;

const dev = env.dev;
const stage = env.stage;
const prod = env.prod;
const remotes = env.remotes;

function init(name) {
    const [,, ...args] = process.argv;
    console.log(
        chalk.yellow('Fetching remotes...')
    );
    simpleGitPromise.fetch(remotes)
    .then(
        (successFetch) => {
            console.log(
                chalk.yellow(`Fetch Successful! Pulling '${dev}'...`)
            );
            simpleGitPromise.raw([
                'pull',
                'origin',
                `${dev}`,
            ])
            .then(
                (successPull) => {
                    console.log(
                        chalk.yellow(`Successfully pulled latest from ${dev}. Checking out ${dev}...`)
                    );
                    simpleGitPromise.raw([
                        'checkout',
                        `${dev}`,
                    ])
                    .then(
                        (successCheckout) => {
                            console.log(
                                chalk.yellow(`${dev} checked out. Merging ${args} into ${dev}...`)
                            );
                            simpleGitPromise.raw([
                                'merge',
                                `${args}`,
                            ])
                            .then(
                                (successMerge) => {
                                    console.log(
                                        chalk.yellow(`Successfully merged ${args} to development branch ${dev}`)
                                    );
                                    console.log(
                                        chalk.blueBright(`You are now on ${dev}.`)
                                    );
                                    console.log(
                                        chalk.magentaBright('Remember to resolve merge conflicts and push to origin.')
                                    );
                                }, (failed) => {
                                    console.log(
                                        chalk.red(`Failed to merge ${args} into ${dev}`)
                                    );
                                }
                            )
                        }, (failed) => {
                            console.log(
                                chalk.red(`Failed to checkout ${dev}.`)
                            );
                        }
                    )
                }, (failed) => {
                    console.log(
                        chalk.red(`Failure to pull from ${dev}.`)
                    );
                }
            )
        }, (failed) => {
            console.log(
                chalk(
                    chalk.red(`Failed to fetch from origin.`)
                )
            );
        }
    )
}
init();