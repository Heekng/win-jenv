exports.getJsonPath = () => {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}