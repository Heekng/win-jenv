import print from './print';
import pathFinder from './path-finder';
import path from 'path';
import fs from 'fs-extra';
import child_process from 'child_process';

const PATH = path.join(pathFinder.getJsonPath(), "/");

const start = function () {
    const command = process.argv[2];
    
    if (command === 'init') {
        init();
    } else if (command === 'show') {
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

const set = async function (jdk_name) {
    const jdk_path = await findJdkPath(jdk_name);
    if (!jdk_path) {
        print.red('error! not exist key.');
        process.exit();
    }
    const returnText = setJavaHome(jdk_path);

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

async function findJdkPath(jdk_name) {
    const jenvSetObj = await readBlogJson();
    const jdk_path = jenvSetObj[jdk_name];
    return jdk_path ? jdk_path : '';
}

function setJavaHome(jdk_path) {
    const inputCmd = 'setx -M JAVA_HOME "'+jdk_path+'"';
    child_process.exec(inputCmd, (err, out, stderr) => {
        if (err == null) {
            print.yellow('JAVA_HOME path setting success!\nplease close and open terminal');
        }
    })

}

exports.start = start;