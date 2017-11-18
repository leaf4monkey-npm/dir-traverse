/**
 * Created by leaf4monkey on 11/18/2017
 */
const finder = require('../');
const mockData = require('./mock');
const {assert} = require('chai');
const PATH = require('path');

const path = require.resolve('./mock');
const {dir} = PATH.parse(path);
let filter = file => file !== 'index.js';
describe('finder()', () => {
    let result;
    const handler = ({filename, isDirectory, layer, parent}) => {
        result[layer] = result[layer] || {directories: [], files: []};
        const desc = {name: filename, parent};
        const name = isDirectory ? 'directories' : 'files';
        result[layer][name].push(desc);
    };

    beforeEach(() => {
        result = [];
    });

    it('walk the directory in 1st layer on default', () => {
        finder(dir, {filter, handler});
        assert.deepEqual(result, mockData.slice(0, 1));
    });

    it('walk the directory recursively', () => {
        finder(dir, {filter, handler, recursive: true});
        assert.sameDeepOrderedMembers(result, mockData);
    });

    it('walk the directory recursively in assigned depth', () => {
        const depth = 3;
        finder(dir, {filter, handler, recursive: true, depth});
        assert.sameDeepOrderedMembers(result, mockData.slice(0, depth));
    });
});
