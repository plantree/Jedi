'use strict';

const index = require("koa-router")();
const db = require("../utils/db");
const config = require("../utils/config");

index.get("404", async (ctx, next) => {
    ctx.response.body = "<h2>404 Not Found</h2>";
});

index.get("/", async (ctx, next) => {
    ctx.response.body = "Hello world";
});

module.exports = index;