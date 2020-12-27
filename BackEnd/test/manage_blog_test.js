/*
 * @Author: py.wang 
 * @Date: 2020-12-08 10:45:14 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-12-11 11:34:40
 */
'use strict';

const assert = require("assert");
const { postBlog, postAllDrafts } = require("../tools/blogManage");
const db = require("../utils/db");
const { parseMetaBody, validateParsedBlog } = require("../utils/parseMarkdown");
const path = "./source/_post/hello-world.md";

/**
 * @brief: test mangange blogs
 */
describe("#blogManage.js", () => {
    var connect;
    before(async ()=> {
        connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.blogInsert(parseMetaBody(path));
        assert.strictEqual(res[0], true);
    });
    after(async ()=> {
        let res = await db.blogClear();
        assert.strictEqual(res[0], true);
        connect[1].disconnect();
    });
    describe("postBlog()", () => {
        it("error format", async() => {
            let res = await postBlog("Hello.js");
            assert.strictEqual(res, false);
        });
        it("file not exisits", async () => {
            let res = await postBlog("hello.md");
            assert.strictEqual(res, false);
        });
        it("already in db", async () => {
            let res = await postBlog("Hello World.md");
            assert.strictEqual(res, false);
        });
        it("successful", async () => {
            let res = await postBlog("Hello World 01.md");
            assert.strictEqual(res, true);
            let count = await db.blogCount();
            assert.strictEqual(count[1], 2);
        });
    });

    describe("#postAllDrafts()", () => {
        it("successfully", async () => {
            await postAllDrafts();
        });
    });
});