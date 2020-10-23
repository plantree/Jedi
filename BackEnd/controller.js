'use strict';

const fs = require("fs");
const path = require("path");

// function addMapping(router, mapping) {
//     for (let url in mapping) {
//         if (url.startsWith("GET ")) {
//             let path = url.substring(4);
//             // register to router
//             router.get(path, mapping[url]);
//             console.log(`register URL mapping: GET ${path}`);
//         } else if (url.startsWith("POST ")) {
//             let path = url.substring(5);
//             router.post(path, mapping[url]);
//             console.log(`register URL mapping: POST ${path}`);
//         } else {
//             // invalid URL temporally
//             console.log(`invalid URL: ${url}`);
//         }
//     }
// }

// function addControllers(router, dir) {
//     // scan the directory of controller
//     let files = fs.readdirSync(fs.path.join(__dirname, dir));

//     // filter .js
//     let js_files = files.filter((item) => {
//         return item.endsWith(".js");
//     });

//     for (let item of js_files) {
//         console.log(`process controllers: ${item}...`);
//         // get .js file
//         let mapping = require(__dirname + "/controllers/" + item)
//         addMapping(router, mapping);
//     }
// }

// module.exports = function(dir) {
//     let controller_dir = dir || "controllers",
//         router = require("koa-router")();
//     addControllers(router, controller_dir);
//     return router.routes();
// };

function addControllers(dir) {
    // scan the directory of controller
    let files = fs.readdirSync(path.join(__dirname, dir));

    // filter .js
    let js_files = files.filter((item) => {
        return item.endsWith(".js");
    });

    let routers = [];
    for (let item of js_files) {
        console.log(`process controllers: ${item}...`);
        // get .js file
        let mapping = require(path.join(__dirname, dir, item));
        routers.push(mapping);
    }
    return routers;
}

module.exports = function(dir = "controllers") {
    return addControllers(dir);
}