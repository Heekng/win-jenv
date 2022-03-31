const print = require('./print');

const start = function () {
    const command = process.argv[2];
    
    if (command === 'one') {
        print.red("hello?");
    } else if (command === 'two') {
        print.gray("hello?");
    }
}

exports.start = start;