import print from './print';

const start = function () {
    const command = process.argv[2];
    
    if (command === 'init') {
        print.red("init");
        init();
    } else if (command === 'show') {
        print.gray("show");
        show();
    } else if (command === 'set') {
        const jdk_name = process.argv[3];
        set(jdk_name);
    } else {
        print.yellow("win-java \<command\> \ncommand are init, show, set");
        process.exit();
    }
}

const init = function () {
}

const show = function () {
}

const set = function (jdk_name) {
}

exports.start = start;