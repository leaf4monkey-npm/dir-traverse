/**
 * Created on 2017/6/9.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
let Directory = require('./directory');

function loader (dir, options) {
    let {handler, filter} = options;
    let directory = new Directory({dir, filter});

    directory.ls().forEach(filename => {
        let fullPath = directory.fullPath(filename);
        let stat = directory.stat(filename);
        let isFile = stat.isFile();
        let isDirectory = stat.isDirectory();

        handler({directory, filename, fullPath, isFile, isDirectory, options});
    });
}

module.exports = loader;
