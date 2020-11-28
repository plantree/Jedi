'use strict';

const router = require("koa-router")();
const mongoose = require("../utils/db");
const { Schema, model } = mongoose;


router.get("/", async (ctx, next) => {
    // ctx.response.type = "text/html";
    // ctx.response.body = "<h1>Hello, koa2!</h1>";
    ctx.redirect("/index.html");
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