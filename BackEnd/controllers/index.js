'use strict';

const router = require("koa-router")();

router.get("/", async (ctx, next) => {
    ctx.response.type = "text/html";
    ctx.response.body = "<h1>Hello, koa2!</h1>";
});

module.exports = function() {
    return router.routes();
};