const path = require("path");

const paths = require("./paths");
const commonConfig = require("./webpack.common.config");

module.exports = [
  {
    ...commonConfig,
    context: path.join(paths.appSrc, "main"),
    entry: "./main.ts",
    target: "electron-main",
    output: {
      path: paths.appBuild,
      filename: "main.js",
      publicPath: "./",
    },
    module: {
      rules: [
        ...commonConfig.module.rules,
        {
          loader: require.resolve("file-loader"),
          exclude: [/\.m?(j|t)sx?$/, /\.node$/, /\.html$/, /\.json$/],
          options: {
            name: "assets/media/[name].[hash:8].[ext]",
          },
        },
      ],
    },
  },
];
