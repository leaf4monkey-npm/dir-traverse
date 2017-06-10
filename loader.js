/**
 * Created on 2017/6/9.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
let Directory = require('./directory');
let PATH = require('path');

function loader (dir, options) {
    let {handler, filter} = options;
    let directory = new Directory({dir, filter});

    directory.ls().forEach(filename => {
        let fullPath = directory.fullPath(filename);
        let stat = directory.stat(filename);
        let isFile = stat.isFile();
        let isDirectory = stat.isDirectory();
        let name = filename;
        if (isFile) {
            name = PATH.parse(filename).name;
        }

        handler({directory, filename, name, fullPath, isFile, isDirectory, options});
    });
}

module.exports = loader;
