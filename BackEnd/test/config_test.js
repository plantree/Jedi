/*
 * @Author: py.wang 
 * @Date: 2020-11-12 10:36:54 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-11-12 10:41:16
 */

'use strict';

/**
 * @brief: test utils/config.js
 */
const assert = require("assert");
const config = require("../utils/config")();

describe("#config.js", () => {
    it("config['db_url'] should be 'mongodb://localhost/jed'", () => {
        assert(config['db_url'], "mongodb://localhost/jed");
    });
});





