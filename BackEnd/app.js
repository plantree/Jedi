'use strict';

const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const render = require("koa-ejs");
const compress = require("koa-compress");
const static_ = require("koa-static");
const Router = require("koa-router");
const router = new Router();

let app = new Koa();

/**
 * Middleware
 */
// add logger
app.use(async (ctx, next) => {
    ctx.util = {
        log: require("./utils/log")
    };
    // error handling
    app.on("error", (err) => {
        ctx.util.log.error(err.stack);
    });
    await next();
});

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    ctx.util.log.info(`${ctx.method} ${ctx.url} ${ctx.ip} - ${ctx.status} ${ctx.message} ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(bodyParser());

// add compression
app.use(compress({
    filter (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    gzip: {
        flush: require("zlib").constants.Z_SYNC_FLUSH
    },
    deflate: {
        flush: require("zlib").constants.Z_SYNC_FLUSH
    },
    br: false   // disable brotli
}));

// 404 handler
app.use(async (ctx, next) => {
    await next();
    if (parseInt(ctx.status) === 404) {
        ctx.response.redirect("/404");
    }
});

// add controllers
let controllers = fs.readdirSync(__dirname + "/controllers");
controllers.forEach((item) => {
    if (!item.endsWith(".js")) {
        return true;
    }
    let controller = require(__dirname + "/controllers/" + item.replace(".js", ""));
    // add to router
    if (item === "index.js") {
        router.use("/", controller.routes(),  
                controller.allowedMethods());
    } else {
        router.use("/" + item.replace(".js", ""), controller.routes(),  
                controller.allowedMethods());
    }
});
app.use(router.routes());

// add render
render(app, {
    root: path.join(__dirname, "views"),
    layout: "template",
    viewExt: "html",
    cache: true,
    debug: false,
    async: true
});

// server static files
app.use(static_(
    path.join(__dirname, "./public")
));

http.createServer(app.callback()).listen(3000, () => {
    console.log("app starts at port 3000...");
});
// TODO: https
// https.createServer(app.callback()).listen(3001);