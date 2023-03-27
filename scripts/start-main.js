"use strict";

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const webpack = require("webpack");

const electronMon = require("electronmon");

const { clearTerminal } = require("../config/utils");

const mainConfig = require("../config/webpack.main.config");
const preloadConfig = require("../config/webpack.preload.config");

const startWatch = new Promise(resolve => {
  const compiler = webpack([...mainConfig, ...preloadConfig]);
  compiler.watch(
    {
      ignored: "./src/apps",
    },
    (err, stats) => {
      clearTerminal();
      if (err) {
        console.error(err);
      } else {
        if (stats.hasErrors() || stats.hasWarnings()) {
          console.info(stats.toString("minimal"));
        } else {
          console.info(
            stats.toString({
              colors: true,
              entrypoints: false,
              // children: false,
              modules: false,
              source: false,
              usedExports: false,
            })
          );
        }
      }
      resolve();
    }
  );
});

startWatch.then(() => {
  electronMon({
    patterns: ["!**/*", "build/**/*"],
  }).then(() => {
    console.info("start electron dev mode");
  });
});
