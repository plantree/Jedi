'use strict';

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// @return -1, means error
function parseConfig() {
    if (!fs.existsSync(path.join(__dirname, "..", "_config.yml"))) {
        console.error("../_config.yml does not exist");
        return -1;
    }
    const configFile = fs.readFileSync(path.join(__dirname, "..", "_config.yml"));
    return yaml.parse(configFile.toString());
}

// console.log(parseConfig());

module.exports = function() {
    return parseConfig()
}

