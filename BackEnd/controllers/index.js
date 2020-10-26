'use strict';

const router = require("koa-router")();

router.get("/", async (ctx, next) => {
    ctx.response.type = "text/html";
    ctx.response.body = "<h1>Hello, koa2!</h1>";
});

router.get("/users", async(ctx, next) => {
    const users = [{name: "Dead Horse"}];
    await ctx.render("content", {
        users
    });
});

module.exports = function() {
    return router.routes();
};