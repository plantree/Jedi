'use strict';

const fs = require("fs");
// parse meta
const marked = require("./marked_extend");
const yaml = require("yaml");

function parseMetaBody(path) {
    let res = {};

    // get content
    let data = fs.readFileSync(path);
    let Lexer = marked.Lexer;
    let lexer = new Lexer();
    let tokens = lexer.lex(data.toString());
    
    // get meta
    let metaToken = lexer.getToken(tokens, "meta");
    let tags = metaToken['datas']['tags'].split(",");
    let temp = [];
    for (let item of tags) {
        if (item === "") {
            continue;
        }
        temp.push(item.trim());
    }
    metaToken['datas']['tags'] = temp;
    for (let item in metaToken['datas']) {
        res[item] = metaToken['datas'][item];
    }
    
    // get body
    let body = marked.parser(tokens);
    res['body'] = body;

    // get stats
    let stats = fs.statSync(path);
    res['publishDate'] = stats.birthtime;
    res['updateDate'] = stats.mtime;

    return res;
}

// console.log(parseMetaBody("../source/_posts/hello-world.md"));

module.exports = {
    "parseMetaBody": parseMetaBody
}