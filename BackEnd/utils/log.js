/*
 * @Author: py.wang 
 * @Date: 2020-12-01 10:44:15 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-12-01 10:58:10
 */
'use strict';

const log4js = require("log4js");

log4js.configure({
    appenders: {
        everything: {type: 'file', filename: `logs/${new Date().toLocaleDateString()}.log`}
    },
    categories: {
        default: {appenders: ['everything'], level: 'info'}
    }
});

let logger = log4js.getLogger();

module.exports = logger;