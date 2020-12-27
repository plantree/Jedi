/*
 * @Author: py.wang 
 * @Date: 2020-12-01 10:44:15 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-12-04 10:59:43
 */
'use strict';

const log4js = require("log4js");

log4js.configure({
    appenders: {
        file: {
            type: 'file', 
            filename: `logs/${new Date().toLocaleDateString()}.log`,
            backups: 3
        },
        terminal: {
            type: 'console'
        }
    },
    categories: {
        default: {appenders: ['file', 'terminal'], level: 'info'}
    }
});

let logger = log4js.getLogger();

module.exports = logger;