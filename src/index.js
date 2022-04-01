import print from './print';
import pathFinder from './path-finder';
import path from 'path';
import fs from 'fs-extra';

const PATH = path.join(pathFinder.getJsonPath(), "/");

const start = function () {
    const command = process.argv[2];
    
    if (command === 'init') {
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
    const jsonPath = PATH + 'jenvSet.json';
    createJenvSetJson(jsonPath);
    print.yellow('init jenvSet.json\nPATH => ' + jsonPath);
}

const show = async function () {
    const jenvSetObj = await readBlogJson();
    print.yellow('PATH => ' + PATH + 'jenvSet.json')
    print.yellow('win-jenv jdk saved list')
    for (let index = 0; index < Object.keys(jenvSetObj).length; index++) {
        const name = Object.keys(jenvSetObj)[index];
        print.yellow((index+1) + '.\t' + name + ':\t' + jenvSetObj[name])
    }
}

const set = function (jdk_name) {
}

function createJenvSetJson(filePath) {
    const content = '{\n' +
        '   "ex)jdkName":"ex)jdk bin Path"\n' + 
        '}';
    saveBlogJson(content);
}

const saveBlogJson = async (blogJson) => {
    const content = (typeof blogJson) === 'string' ? blogJson : JSON.stringify(blogJson);
    try {
        return await fs.writeFile(PATH + 'jenvSet.json', content, 'utf8');

    } catch (err) {
        print.red('error! retry please.');
        throw err;
    }
};

const readBlogJson = async () => {
    try{
        return await fs.readJson(PATH + 'jenvSet.json', 'utf8');
    } catch (err) {
        print.red('error! check ' + PATH + 'jenvSet.json')
        throw err;
    }
}


exports.start = start;