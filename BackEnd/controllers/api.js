'use strict';

const Router = require("koa-router");
const api = new Router();

api.get("/", async (ctx, next) => {
    ctx.body = "api";
});

api.get("/v1", async (ctx, next) => {
    ctx.body = "api v1";
});

module.exports = api;
