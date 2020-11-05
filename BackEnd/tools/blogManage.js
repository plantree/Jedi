'use strict';

const { mongoose, blogModel, blogInsert } = require("../utils/db");
const { parseMetaBody } = require("../utils/parseMarkdown");

let content = parseMetaBody("../source/_posts/hello-world.md");
blogInsert(blogModel, content);