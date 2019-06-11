const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "src"),
        filename: "bundle.js"
    },
    devtool: "source-map"
};