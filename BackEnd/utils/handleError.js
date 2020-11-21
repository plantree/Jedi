/*
 * @Author: py.wang 
 * @Date: 2020-11-12 10:54:24 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-11-17 10:31:03
 */
'use strict';
function handleDBError(err) {
    console.error("Error about db, " + err.toString());
    return [false, null];
}

function handleBlogError(err) {
    console.error("Error about blog, " + err.toString());
    return [false, null];
}

module.exports = {
    "handleDBError": handleDBError,
    "handleBlogError": handleBlogError,
}