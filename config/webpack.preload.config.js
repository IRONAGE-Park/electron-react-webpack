const path = require("path");

const paths = require("./paths");
const commonConfig = require("./webpack.common.config");

module.exports = [
  {
    ...commonConfig,
    context: path.join(paths.appSrc, "preload"),
    entry: paths.appPages.reduce(
      (previous, pageName) => ({
        ...previous,
        [pageName]: `./${pageName}.ts`,
      }),
      {}
    ),
    target: "electron-preload",
    output: {
      path: path.join(paths.appBuild, "preload"),
      filename: "[name].js",
    },
  },
];
