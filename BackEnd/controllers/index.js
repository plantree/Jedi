'use strict';

const router = require("koa-router")();
const db = require("../utils/db");
const config = require("../utils/config");

router.get("/", async (ctx, next) => {
    ctx.body = "Hello world";
});


module.exports = function() {
    return router.routes();
};