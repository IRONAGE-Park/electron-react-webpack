"use strict";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const webpack = require("webpack");

const { clearTerminal } = require("../config/utils");

const mainConfig = require("../config/webpack.main.config");
const preloadConfig = require("../config/webpack.preload.config");

const compiler = webpack([...mainConfig, ...preloadConfig]);

new Promise((resolve, reject) => {
  compiler.run((err, stats) => {
    const messages = {
      errors: [],
      warnings: [],
    };
    if (err) {
      if (!err.message) {
        return reject(err);
      }

      let errMessage = err.message;

      messages.errors = [errMessage];
    }
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      return reject(new Error(messages.errors.join("\n\n")));
    }
    const resolveArgs = {
      stats,
    };

    return resolve(resolveArgs);
  });
}).then(({ stats }) => {
  clearTerminal();
  console.log(
    stats.toString({
      colors: true,
    })
  );
});
