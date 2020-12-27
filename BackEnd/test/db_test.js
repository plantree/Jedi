/*
 * @Author: py.wang 
 * @Date: 2020-11-12 10:59:25 
 * @Last Modified by: py.wang
 * @Last Modified time: 2020-12-10 11:03:50
 */
'use test';

/**
 * @brief: test for db.js
 */
const assert = require("assert");
const db = require("../utils/db");
const { parseMetaBody } = require("../utils/parseMarkdown");
const path = "./source/_post/hello-world.md";

function compareArray(lhs, rhs) {
    if (lhs.length !== rhs.length) {
        return false;
    }
    for (let i = 0; i < lhs.length; ++i) {
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }
    return true;
}

describe("#db.js", () => {
    it ("mongoConnect() should be successful", async () => {
        let res = await db.mongoConnect();
        assert.strictEqual(res[0], true);
        res[1].disconnect();
    });

    it ("mongoConnect() should be failed", async () => {
        let res = await db.mongoConnect('123');
        assert.strictEqual(res[0], false);
    });

    // utils
    it ("validateInsert should return false", () => {
        let insertContent = {"title": "123", "body": "234", 
                            "publishDate": Date.now()};
        assert.strictEqual(db.validateInsert(insertContent), false);
    });
    it ("validateInsert should return true", () => {
        let insertContent = {"title": "123", "body": "234", 
                            "publishDate": Date.now(), "updateDate": Date.now()};
        assert.strictEqual(db.validateInsert(insertContent), true);
    });
    
    it ("filterUpdate should just return suppported fields", () => {
        let updateContent = {"title": "123", "body": "234", 
                            "publishDate": Date.now(), "updateDate": Date.now()};
        let filtered = db.filterUpdate(updateContent);
        assert.strictEqual(filtered.hasOwnProperty("publishDate"), false);
        assert.strictEqual(filtered["body"], "234");
    });

    it ("validateComment should return false", () => {
        let comment = {"bdoy": "123", "date": Date.now(),
                        "email": "1@123.com", "name": "plantree"};
        assert.strictEqual(db.validComment(comment), false);
    });
    it ("validateComment should return true", () => {
        let comment = {"body": "123", "date": Date.now(),
                        "email": "1@123.com", "name": "plantree"};
        assert.strictEqual(db.validComment(comment), true);
    });

    // operators
    it ("blogClear should clear all", async () => {
        let connect = await db.mongoConnect();
        if (connect[0]) {
            let clear = await db.blogClear();
            assert.strictEqual(clear[0], true);
            let count = await db.blogCount();
            assert.strictEqual(count[1], 0);
            connect[1].disconnect();
        } else {
            return;
        }
    });

    it ("blogInsert should be successful", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let content = parseMetaBody(path);
        let res = await db.blogInsert(content);
        assert.strictEqual(res[0], true);
        assert.strictEqual(res[1]["title"], "Hello World");
        await db.blogClear();
        connect[1].disconnect();
    });

    it ("blogDelete should be fail", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let content = parseMetaBody(path);
        await db.blogInsert(content);
        let res = await db.blogDelete("Hello");
        assert.strictEqual(res[0], true);
        assert.strictEqual(res[1]["deletedCount"], 0);
        let count = await db.blogCount();
        assert.strictEqual(count[1], 1);
        connect[1].disconnect();
    });

    it ("blogDelete should be successfully", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.blogDelete("Hello World");
        assert.strictEqual(res[1]["deletedCount"], 1);
        let count = await db.blogCount();
        assert.strictEqual(count[1], 0);
        connect[1].disconnect();
    });

    it ("blogUpdate should be successfully", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let content = parseMetaBody(path);
        await db.blogInsert(content);
        let res = await db.blogUpdate("Hello World", {"category": "Test"});
        assert.strictEqual(res[0], true);
        assert.strictEqual(res[1]["nModified"], 1);

        let blog = await db.findByTitle("Hello World");
        assert.strictEqual(blog[1]["category"], "Test");
        connect[1].disconnect();
    });

    it ("blogUpdate should be failed", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.blogUpdate("Hello World", {"tag": ["Algorithm"]});
        assert.strictEqual(res[0], true);
        assert.strictEqual(res[1]["nModified"], 0);

        let blog = await db.findByTitle("Hello World");
        assert.strictEqual(compareArray(blog[1]["tags"], ["hello", "world"]), true);
        connect[1].disconnect();
    });

    it ("addComment should be failed", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let blog = await db.findByTitle("Hello World");
        assert.strictEqual(blog[1]['comment'].length, 0);
        let comment = {};
        let res = await db.addComment("Hello World", comment);
        assert.strictEqual(res[0], false);
        connect[1].disconnect();
    });

    it ("addComment should be successful", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let blog = await db.findByTitle("Hello World");
        assert.strictEqual(blog[1]['comment'].length, 0);
        let comment = {"body": "hello", "date": Date.now(),
                        "email": "123@456.com", "name": "plantree"};
        let res = await db.addComment("Hello World", comment);
        assert.strictEqual(res[0], true);
        assert.strictEqual(res[1]["nModified"], 1);
        blog = await db.findByTitle("Hello World");
        assert.strictEqual(blog[1]["comment"][0]["name"], "plantree");
        connect[1].disconnect();
    });

    it ("addCommentVote should be successful", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let blog = await db.findByTitle("Hello World");
        let date = blog[1]["comment"][0]["date"];
        let res = await db.addCommentVote("Hello World", date);
        assert.strictEqual(res[0], true);
        assert.strictEqual(res[1]["nModified"], 1);
        blog = await db.findByTitle("Hello World");
        assert.strictEqual(blog[1]["comment"][0]["vote"], 1);
        connect[1].disconnect();
    });

    it ("addViewCount, addLike & addDislike should be successful", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let resView = await db.addViewCount("Hello World");
        let resLike = await db.addLike("Hello World");
        let resDislike = await db.addDislike("Hello World");
        assert.strictEqual(resView[1]["nModified"], 1);
        assert.strictEqual(resLike[1]["nModified"], 1);
        assert.strictEqual(resDislike[1]["nModified"], 1);
        blog = await db.findByTitle("Hello World");
        assert.strictEqual(blog[1]["viewCount"], 1);
        assert.strictEqual(blog[1]["like"], 1);
        assert.strictEqual(blog[1]["dislike"], 1);
        connect[1].disconnect();
    });

    it ("findByTitle should be faield", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.findByTitle("Test");
        assert(res[0], true);
        assert(res[0], null);
        connect[1].disconnect();
    });
    it ("findByCategory should be successful", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.findByCategory("Test");
        assert.strictEqual(res[1].length, 1);
        assert.strictEqual(res[1][0]["title"], "Hello World");
        
        res = await db.findByCategory("test");
        assert.strictEqual(res[1].length, 0);
        connect[1].disconnect();
    });

    it ("findByTag should be successful", async () => {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.findByTag("hello");
        assert.strictEqual(res[1].length, 1);
        assert.strictEqual(res[1][0]["title"], "Hello World");
        
        res = await db.findByTag("test");
        assert.strictEqual(res[1].length, 0);
        connect[1].disconnect();
    });

    it ("clear all", async ()=> {
        let connect = await db.mongoConnect();
        if (!connect[0]) {
            return;
        }
        let res = await db.blogClear();
        assert.strictEqual(res[0], true);
        connect[1].disconnect();
    });
});


