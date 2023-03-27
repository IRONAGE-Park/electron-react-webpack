require("dotenv").config();
const { notarize } = require("electron-notarize");

const { appId } = require("../package.json");
// Package files

exports.default = async function notarizing(result) {
  const { platformToTargets, artifactPaths } = result;
  const isMac = Array.from(platformToTargets.keys()).every(
    value => value.nodeName === "darwin"
  );
  if (!isMac) {
    return;
  }
  return artifactPaths.map(
    async artifactPath =>
      await notarize({
        appBundleId: appId,
        appPath: artifactPath,
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_PASSWORD,
      })
  );
};
