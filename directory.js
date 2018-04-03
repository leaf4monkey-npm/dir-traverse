/**
 * Created by leaf4monkey on 11/18/2017
 */
const fs = require('fs');

const checkDir = path => {
    const stat = fs.statSync(path);
    if (!stat.isDirectory()) {
        throw new Error(`Unexpected file of path '${path}'`);
    }
};

const getFilter = filter => {
    if (!filter) {
        return;
    }

    let type = typeof filter;
    if (type === 'function') {
        return filter;
    }
    if (type === 'string') {
        return file => file === filter;
    }
    if (filter instanceof RegExp) {
        return file => filter.test(file);
    }
    if (filter instanceof Array) {
        const filterArr = filter.map(getFilter);
        return file => filterArr.some(f => f(file));
    }

    throw new TypeError(
        `Expect \`filter\` to be a function, RegExp type, string or an Array of string, got a(n) ${type}.`
    );
};

/**
 *
 * @param path
 * @param filter
 * @returns {Array.<string>}
 */
const ls = (path, filter) => {
    checkDir(path);

    let arr = fs.readdirSync(path);
    if (filter) {
        arr = arr.filter(getFilter(filter));
    }
    return arr;
};

module.exports = {
    ls
};
