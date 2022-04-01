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
    } else if (command === 'add') {
        const jdk_name = process.argv[3];
        const jdk_path = process.argv[4];
        add(jdk_name, jdk_path);
    } else if (command === 'delete') {
        const jdk_name = process.argv[3];
        remove(jdk_name);
    } else {
        print.yellow("win-java \<command\> \ncommand are init, show, set, add, delete");
        process.exit();
    }
}
 
const init = () => {
    const jsonPath = PATH + 'jenvSet.json';
    createJenvSetJson(jsonPath);
    print.yellow('init jenvSet.json\nPATH => ' + jsonPath);
}

const show = async () => {
    const jenvSetObj = await readBlogJson();
    print.yellow('PATH => ' + PATH + 'jenvSet.json')

    if (Object.keys(jenvSetObj).length <= 0) {
        print.red('win-jenv jdk saved list is empty');
        process.exit();
    }
    print.yellow('win-jenv jdk saved list')
    for (let index = 0; index < Object.keys(jenvSetObj).length; index++) {
        const name = Object.keys(jenvSetObj)[index];
        print.yellow((index+1) + '.\t' + name + ':\t' + jenvSetObj[name])
    }
}

const set = async jdk_name => {
    const jdk_path = await findJdkPath(jdk_name);
    if (!jdk_path) {
        print.red('error! not exist key.');
        process.exit();
    }
    setJavaHome(jdk_path);
}

const add = async (jdk_name, jdk_path) => {
    const jsonPath = PATH + 'jenvSet.json';
    if (await hasJdkName(jdk_name)) {
        print.red(jdk_name + ' is exist\nplease input another name');
        process.exit();
    }
    await addJdk(jdk_name, jdk_path, jsonPath);
    print.yellow('jdk add success!\n' + jdk_name + ': ' + jdk_path);
    process.exit();
}

const remove = async (jdk_name) => {
    const jsonPath = PATH + 'jenvSet.json';
    if (!await hasJdkName(jdk_name)) {
        print.red(jdk_name + ' is not exist\nplease input another name');
        process.exit();
    }
    await removeJdk(jdk_name, jsonPath);
    print.yellow('jdk remove success!\n' + jdk_name);
    process.exit();
}


const createJenvSetJson = (filePath) => {
    const content = '{\n' +
        '   "ex)jdkName":"ex)jdk bin Path"\n' + 
        '}';
    const fileExist = checkJenvSetJson(filePath);
    if (fileExist) {
        print.red("file is exist\nplease check path => " + filePath);
        process.exit();
    }
    saveJenvSetJson(content, filePath);
}

const saveJenvSetJson = async (blogJson, filePath) => {
    const content = (typeof blogJson) === 'string' ? blogJson : JSON.stringify(blogJson);
    try {
        return await fs.writeFile(filePath, content, 'utf8');

    } catch (err) {
        print.red('error! retry please.');
        throw err;
    }
};

const checkJenvSetJson = async (filePath) => {
    await fs.exists(filePath, function (exists) {
        return exists;
    })
}

const readBlogJson = async () => {
    try{
        return await fs.readJson(PATH + 'jenvSet.json', 'utf8');
    } catch (err) {
        print.red('error! check ' + PATH + 'jenvSet.json')
        throw err;
    }
}

const findJdkPath = async (jdk_name) => {
    const jenvSetObj = await readBlogJson();
    const jdk_path = jenvSetObj[jdk_name];
    return jdk_path ? jdk_path : '';
}

const hasJdkName = async (jdk_name) => {
    const jenvSetObj = await readBlogJson();
    return jenvSetObj.hasOwnProperty(jdk_name);
}

const addJdk = async (jdk_name, jdk_path, jsonPath) => {
    const jenvSetObj = await readBlogJson();
    jenvSetObj[jdk_name] = jdk_path;
    try {
        return await fs.writeFile(jsonPath, JSON.stringify(jenvSetObj), 'utf8');
    } catch (err) {
        print.red('error! retry please.');
        throw err;
    }
}

const removeJdk = async (jdk_name, jsonPath) => {
    const jenvSetObj = await readBlogJson();
    delete jenvSetObj[jdk_name];
    try {
        return await fs.writeFile(jsonPath, JSON.stringify(jenvSetObj), 'utf8');
    } catch (err) {
        print.red('error! retry please.');
        throw err;
    }
}

const setJavaHome = (jdk_path) => {
    const inputCmd = 'setx -M JAVA_HOME "'+jdk_path+'"';
    child_process.exec(inputCmd, (err, out, stderr) => {
        if (err == null) {
            print.yellow('JAVA_HOME path setting success!\nplease close and open terminal');
        }
    })
}

exports.start = start;