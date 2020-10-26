'use strict';

const path = require("path");
const Koa = require("koa");
const logger = require("koa-logger");
const render = require("koa-ejs");
const compress = require("koa-compress");
const controller = require("./controller");

let app = new Koa();

// error debug
app.on("error", function(err) {
    console.log(err.stack);
});

// add logger
app.use(logger());

// add compression
app.use(compress({
    // filter (content_type) {
    //     return /text/i.test(content_type)
    // },
    threshold: 2048,
    gzip: {
        flush: require("zlib").constants.Z_SYNC_FLUSH
    },
    deflate: {
        flush: require("zlib").constants.Z_SYNC_FLUSH
    },
    br: false   // disable brotli
}));

// before serve rquest
app.use(function (ctx, next) {
    ctx.state = ctx.state || {};
    ctx.state.now = new Date();
    ctx.state.ip = ctx.request.ip;
    ctx.state.version = "2.0.0";
    return next();
});

// add controllers
for (let router of controller()) {
    if (typeof router !== "function") {
        continue;
    }
    app.use(router());
}

// add render
render(app, {
    root: path.join(__dirname, "views"),
    layout: "template",
    viewExt: "html",
    cache: true,
    debug: false,
    async: true
});

app.listen(3000);
console.log("app starts at port 3000...");