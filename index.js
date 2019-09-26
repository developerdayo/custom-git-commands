const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Git Commands', {horizontalLayout: 'full'})
    )
);

if (files.directoryExists('.git')) {

}