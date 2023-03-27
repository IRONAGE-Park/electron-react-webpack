const nodeExternals = require("webpack-node-externals");

const makeESLintConfiguration = require("./eslint.config");

const paths = require("./paths");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  node: {
    __dirname: false,
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: paths.aliases,
  },
  module: {
    rules: [
      {
        test: /\.m?([jt])sx?$/,
        include: /src/,
        exclude: [/node_modules/, /src\/renderer/],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  // node: "current",
                  esmodules: true,
                },
                modules: "auto",
              },
            ],
            "@babel/preset-typescript",
          ],
          plugins: ["@babel/plugin-proposal-object-rest-spread"],
          cacheDirectory: true,
          cacheCompression: false,
          compact: true,
        },
      },
    ],
  },
  plugins: [makeESLintConfiguration(mode === "development")],
  externals: [nodeExternals()],
  performance: false,
};
