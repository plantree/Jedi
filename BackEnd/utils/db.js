'use stric';

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const config = require("./config")();
const { handleDBError, handleBlogError } = require("./handleError");

const db_url = config['db_url'];

// connect to db
async function mongoConnect(url = db_url) {
    try {
        let db = await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});   
        return [true, db];
    } catch (err) {
        return handleDBError(err);
    }
}

// blog schema
const blogSchema = new Schema({
    "title": {type: String, required: true, unique: true},
    "body": {type: String, required: true},
    "publishDate": {type: Date, required: true, default: Date.now()},
    "updateDate": {type: Date, required: true, default: Date.now()},
    "category": {type: String},
    "tags": [{type: String}],
    "viewCount": {type: Number, default: 0},
    "comment": [{body: String, date: Date, email: String, name: String, vote: Number}],
    "like":{type: Number, default: 0},
    "dislike": {type: Number, default: 0}
});

// blog model
const blogModel = mongoose.model("blog", blogSchema);

// utils
function validateInsert(content) {
    let res = true;
    let requiredFields = ["title", "body", "publishDate", "updateDate"];
    for (let item of requiredFields) {
        if (!content.hasOwnProperty(item)) {
            res = false;
            break;
        }
    }
    return res;
}

function filterUpdate(updateContent) {
    let supportFields = ["body", "updateDate", "category", "tags"];
    // filter
    let filterContent = {};
    for (let item of supportFields) {
        if (updateContent.hasOwnProperty(item)) {
            filterContent[item] = updateContent[item];
        }
    }
    return filterContent;
}

function validateComment(commentContent) {
    let requiredFields = ['body', 'date', 'email', 'name'];
    let res = true;
    for (let field of requiredFields) {
        if (!commentContent.hasOwnProperty(field)) {
            res = false;
            break;
        }
    }
    return res;
}

/**
 * @brief: functions about CURD
 */
// WARNING: just for test!!!
async function blogClear() {
    try {
        let res = await blogModel.deleteMany({});
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function blogCount() {
    try {
        let res = await blogModel.countDocuments({});
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function blogInsert(content) {
    if (!validateInsert(content)) {
        console.error(`invalid insert`);
        return handleBlogError("invalid insert");
    }
    let blog = new blogModel(content);
    try {
        let res = blog.save({runValidators: true});
        console.log(`Insert blog '${content['title']}' successfully!`);
        return [true, await res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function blogDelete(title) {
    try {
        let res = await blogModel.deleteOne({"title": title});
        console.log(`Delete blog '${title}' successfully!`);
        return [true, res];
    } catch (err) {
        handleBlogError(err);
    }
}

/**
 * Update
 */
// support updating fields [body, updateDate, category, tags]
async function blogUpdate(title, updateContent) {
    let filterContent = filterUpdate(updateContent);
    try {
        let res = await blogModel.updateOne({title: title}, filterContent, {runValidators: true});
        console.log(`update blog '${title}', return: ${JSON.stringify(res)}`);
        return [true, await res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function addComment(title, commentContent) {
    if (!validateComment(commentContent)) {
        console.error("invalid comment");
        return handleBlogError("invalid comment");
    }
    commentContent["vote"] = 0;
    try {
        let res = await blogModel.updateOne({title: title}, {$push: {comment: commentContent}});
        console.log(`add blog '${title}' a comment, return: ${JSON.stringify(res)}`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function addCommentVote(title, date) {
    try {
        let res = await blogModel.updateOne({title: title, "comment.date": date}, {$inc: {"comment.$.vote": 1}});
        console.log(`add blog '${title}.${date}' a comment vote, return: ${JSON.stringify(res)}`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function addViewCount(title) {
    try {
        let res = await blogModel.updateOne({title: title}, {$inc: {viewCount: 1}});
        console.log(`add blog '${title}' viewCount, return: ${JSON.stringify(res)}`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function addLike(title) {
    try {
        let res = await blogModel.updateOne({title: title}, {$inc: {"like": 1}});
        console.log(`add blog '${title}' like, return: ${JSON.stringify(res)}`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function addDislike(title) {
    try {
        let res = await blogModel.updateOne({title: title}, {$inc: {"dislike": 1}});
        console.log(`add blog '${title}' dislike, return: ${JSON.stringify(res)}`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

/**
 * Query
 */
async function findByTitle(title) {
    try {
        let res = await blogModel.findOne({title: title});
        console.log(`find by title: '${title}'`);
        return [true, res];
    } catch (err) {
        return handleBlogError(e);
    }
}

async function findByCategory(category) {
    try {
        let res = await blogModel.find({category: category});
        console.log(`find by category: '${category}'`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

async function findByTag(tag) {
    try {
        let res = await blogModel.find({tags: tag});
        console.log(`find by tag: '${tag}'`);
        return [true, res];
    } catch (err) {
        return handleBlogError(err);
    }
}

module.exports = {
    "mongoose": mongoose,
    "mongoConnect": mongoConnect,
    "blogModel": blogModel,
    "validateInsert": validateInsert,
    "filterUpdate": filterUpdate,
    "validComment": validateComment,
    "blogClear": blogClear,
    "blogCount": blogCount,
    "blogInsert": blogInsert,
    "blogDelete": blogDelete,
    "blogUpdate": blogUpdate,
    "addComment": addComment,
    "addCommentVote": addCommentVote,
    "addViewCount": addViewCount,
    "addLike": addLike,
    "addDislike": addDislike,
    "findByTitle": findByTitle,
    "findByCategory": findByCategory,
    "findByTag": findByTag,

}