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
    const featName = process.argv[2];
    console.log(
        chalk.yellow('Fetching...')
    );

    simpleGitPromise.fetch(remotes)
    .then(
        (successFetch) => {
            console.log(
                chalk.yellow(`Fetch Successful! Creating new feature branch from branch '${prod}'`)
            );
            simpleGitPromise.raw([
                'checkout',
                '-b',
                `feature/${featName}`,
                `${prod}`
            ])
            .then(
                (successCommit) => {
                    console.log(
                        chalk.yellow(`checked out feat/${featName}`)
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
                    chalk.red(`failed to fetch from ${prod}`)
                )
            );
        }
    )
}
init();