/*
 * @Author: py.wang 
 * @Date: 2020-11-13 11:19:02 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-11-25 14:43:07
 */
'use strict';

const assert = require("assert");
const { parseMetaBody, validateParsedBlog } = require("../utils/parseMarkdown");

describe("#parseMarkdown", () => {
    it ("parse meta/body of 'Hello World.md'", () => {
        const path = "./source/_posts/hello-world.md";
        let res = parseMetaBody(path);
        assert.strictEqual(res.hasOwnProperty("body"), true);
        assert.strictEqual(res.hasOwnProperty("bodys"), false);
        assert.strictEqual(res.hasOwnProperty("publishDate"), true);
        assert.strictEqual(res.hasOwnProperty("updateDate"), true);
        assert.strictEqual(res['title'], "Hello World");
        assert.strictEqual(res['author'],"plantree");
    });

    it ("validateParsedBlog should be successful", () => {
        const path = "./source/_posts/hello-world.md";
        let res = parseMetaBody(path);
        console.log(res);
        assert.strictEqual(validateParsedBlog(res), true);
    });

    it ("validateParsedBlog should be failed", () => {
        const path = "./source/_posts/hello-world.md";
        let res = parseMetaBody(path);
        delete res["body"];
        assert.strictEqual(validateParsedBlog(res), false);
    });
});