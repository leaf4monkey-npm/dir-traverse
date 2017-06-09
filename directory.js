/**
 * Created on 2017/6/9.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
const fs = require('fs');
const PATH = require('path');

class Directory {
    constructor (options) {
        this.dir = options.dir;
        this.filter = Directory.getFilter(options.filter);
        this.checkExists();
        this.checkDir();
    }

    static getFilter (filter) {
        let type = typeof filter;
        if (type === 'function') {
            return filter;
        }
        if (type === 'string') {
            return function (file) {
                return file === filter;
            };
        }
        if (filter instanceof RegExp) {
            return function (file) {
                return filter.test(file);
            };
        }
        if (filter instanceof Array) {
            return function (file) {
                return filter.indexOf(file) >= 0;
            };
        }
        return () => true;
    }

    stat (file) {
        return fs.statSync(this.fullPath(file));
    }

    isDirectory (file) {
        return this.stat(file).isDirectory();
    }

    isFile (file) {
        return this.stat(file).isFile();
    }

    fullPath (file) {
        if (!file) {
            return this.dir;
        }
        return PATH.resolve(this.dir, file || '');
    }

    checkExists (file) {
        if (!this.exists(file)) {
            throw new Error(`Cannot find path '${this.fullPath(file)}'`);
        }
    }

    checkDir (file) {
        if (!this.isDirectory(file)) {
            throw new Error(`Unexpected file of path '${this.fullPath(file)}'`);
        }
    }

    exists (file) {
        return fs.existsSync(this.fullPath(file));
    }

    ls (file) {
        let path = this.fullPath(file);
        return fs.readdirSync(path).filter(file => this.filter(file));
    }

    findOneExists (files) {
        for (let i of files) {
            if (this.exists(i)) {
                return i;
            }
        }
    }
}

module.exports = Directory;
