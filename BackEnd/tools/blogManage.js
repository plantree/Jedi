/*
 * @Author: py.wang 
 * @Date: 2020-12-08 10:45:21 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-12-11 11:32:18
 */

'use strict';

const fs = require("fs");
const path = require("path");
const db = require("../utils/db");
const logger = require("../utils/log");
const { parseMetaBody, validateParsedBlog } = require("../utils/parseMarkdown");
const rootPath = path.join(__dirname, "..", "source");

async function postBlog(name, relativePath = "") {
    // only support markdown
    if (!name.endsWith(".md")) {
        return false;
    }
    // parse & insert & move
    if (!fs.existsSync(path.join(rootPath, "_draft", relativePath, name))) {
        return false;
    }
    // already existed in db
    let exist = await db.findByTitle(name.split(".")[0]);
    if (exist[0] && exist[1] !== null) {
        return false;
    }
    // parse
    let content = parseMetaBody(path.join(rootPath, "_draft", relativePath, name));
    if (!validateParsedBlog(content)) {
        return false;
    }
    console.log(3);
    // insert
    let res = await db.blogInsert(content);
    if (res[0] === false) {
        return false;
    }
    console.log(4);
    // move. WARNING: first mkdir
    if (!fs.existsSync(path.join(rootPath, "_post", relativePath))) {
        fs.mkdirSync(path.join(rootPath, "_post", relativePath), {recursive: true});
    }
    fs.renameSync(path.join(rootPath, "_draft", relativePath, name), 
                path.join(rootPath, "_post", relativePath, name));
    logger.info(`Internal Operation - tools/postBlog() - ${name}`);
    return true;
}

async function postAllDrafts(relativePath = ".") {
    logger.info(`Internal Operation - tools/postAllDrafts() - ${path.join(rootPath, "_draft", relativePath)}`);
    // recursive
    let dirs = fs.readdirSync(path.join(rootPath, "_draft", relativePath));
    for (let dir of dirs) {
        let stat = fs.statSync(path.join(rootPath, "_draft", relativePath, dir));
        if (stat.isFile()) {
            await postBlog(dir, relativePath);
        } else if (stat.isDirectory()) {
            await postAllDrafts(path.join(relativePath, dir));
        }
    }
}

module.exports = {
    "postBlog": postBlog,
    "postAllDrafts": postAllDrafts
};

