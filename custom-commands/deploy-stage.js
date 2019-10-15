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
        chalk.yellow('Fetching...')
    );
    simpleGitPromise.fetch(remotes)
    .then(
        (successFetch) => {
            console.log(
                chalk.yellow(`Fetch Successful! Creating new feature branch from branch '${prod}'...`)
            );
            simpleGitPromise.raw([
                'pull',
                'origin',
                `${stage}`,
            ])
            .then(
                (successPull) => {
                    console.log(
                        chalk.yellow(`Successfully pulled latest from ${stage}. Checking out ${stage}...`)
                    );
                    simpleGitPromise.raw([
                        'checkout',
                        `${stage}`,
                    ])
                    .then(
                        (successCheckout) => {
                            console.log(
                                chalk.yellow(`${stage} checked out. Merging ${args} into ${stage}...`)
                            );
                            simpleGitPromise.raw([
                                'merge',
                                `${args}`,
                            ])
                            .then(
                                (successMerge) => {
                                    console.log(
                                        chalk.yellow(`Successfully deployed ${args} to development branch ${stage}`)
                                    );
                                }, (failed) => {
                                    console.log(
                                        chalk.red(`Failed to merge ${args} into ${dev}`)
                                    );
                                }
                            )
                        }, (failed) => {
                            console.log(
                                chalk.red(`Failed to checkout ${stage}.`)
                            );
                        }
                    )
                }, (failed) => {
                    console.log(
                        chalk.red(`Failure to pull from ${stage}.`)
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