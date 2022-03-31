import chalk from 'chalk';

const print = {
    red: function (content) {
        console.log(chalk.red(content));
    },
    yellow: function (content) {
        console.log(chalk.yellow(content));
    },
    gray: function (content) {
        console.log(chalk.gray(content));
    }
}

module.exports = print;