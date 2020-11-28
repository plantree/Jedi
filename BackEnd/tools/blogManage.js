'use strict';

const db = require("../utils/db");
const { parseMetaBody } = require("../utils/parseMarkdown");

let content = parseMetaBody("../source/_posts/hello-world.md");
// db.blogInsert(db.blogModel, content);
// db.blogDelete(db.blogModel, "Hello World");
// db.blogUpdate(db.blogModel, "Hello World");
// db.addViewCount(db.blogModel, "Hello World");
// db.addLike(db.blogModel, "Hello World1");
// db.addDislike(db.blogModel, "Hello World");
// db.findByTitle(db.blogModel, "Hello World").then((data) => {
//     console.log(data);
// });
// db.blogUpdate(db.blogModel, "Hello World", {"updateDate": Date.now(), tag: ["Hello"]});
// db.addComment(db.blogModel, "Hello World", 
//     {"body": "good article", "date": new Date().toLocaleDateString(), "email": "1174555847@qq.com", "name": "wpy"});
// db.addCommentVote(db.blogModel, "Hello World", new Date("2020-11-10 16:00:00.000Z"));