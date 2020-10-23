'use strict';

const Koa = require("koa");
const logger = require("koa-logger");
const controller = require("./controller");

let app = new Koa();

// add logger
app.use(logger());

// add controllers
for (let router of controller()) {
    if (typeof router !== "function") {
        continue;
    }
    app.use(router());
}

app.listen(3000);
console.log("app starts at port 3000...");