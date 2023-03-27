"use strict";

const electronBuilder = require("electron-builder");
require("dotenv").config();

const { productName, appId } = require("../package.json");
// Package files

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", err => {
  throw err;
});

const PACKAGE_NAME = productName.replace(/ /g, "-");
const PUBLISHER_NAME = "Publisher name";
const __PATH_LICENSE = "./package/LICENSE.txt";
const __PATH_LICENSE_EUC_KR = "./package/LICENSE-EUC-KR.txt";

const findArgv = flag => process.argv.findIndex(argv => argv === flag) !== -1;

const isNoAsar = findArgv("--no-asar");
const isNoSign = findArgv("--no-sign");

electronBuilder.build({
  x64: true,
  config: {
    // Application Information
    productName: productName,
    appId: appId,
    asar: !isNoAsar,
    compression: "maximum",
    copyright: "Copyright © 2023 IRONAGE-Park",
    publish: {
      provider: "github",
      owner: "IRONAGE-Park",
      repo: "repositories",
    },
    // Files & Directories
    files: ["node_modules/", "build/", "package/", "package.json"],
    directories: {
      buildResources: "./",
      output: "./dist/",
      app: "./",
    },

    npmRebuild: process.platform !== "darwin",

    // Codesign
    ...(isNoSign
      ? {}
      : {
          afterSign: "./package/afterSignHook.js",
          afterAllArtifactBuild: "./package/afterAllArtifactBuildHook.js",
        }),

    // Windows
    win: {
      artifactName: `${PACKAGE_NAME}-Setup-\${version}.\${ext}`,
      publisherName: PUBLISHER_NAME,
      ...(isNoSign
        ? {}
        : {
            certificateSubjectName: PUBLISHER_NAME,
            signingHashAlgorithms: ["sha256"],
            target: ["zip", "nsis"],
            signAndEditExecutable: true,
          }),
      extraFiles: [],
    },
    nsis: {
      shortcutName: productName,
      language: "1042",
      include: "./package/win/installer.nsh",
      license: __PATH_LICENSE_EUC_KR,
      oneClick: false,
      perMachine: true,
      allowToChangeInstallationDirectory: true,
    },
    // macOS
    mac: {
      artifactName: `${PACKAGE_NAME}-\${version}.\${ext}`,
      category: "public.category.detail",
      target: "pkg",
      type: "distribution",
      entitlements: "./package/mac/entitlements.mac.plist",
      entitlementsInherit: "./package/mac/entitlements.mac.plist",
      darkModeSupport: true,
      ...(isNoSign
        ? {}
        : {
            hardenedRuntime: true,
            gatekeeperAssess: false,
            provisioningProfile: process.env.PROVISIONING_PROFILE,
          }),
      extraResources: [
        {
          from: "./package",
          to: ".",
        },
      ],
    },
    pkg: {
      license: __PATH_LICENSE,
      scripts: "./package/mac",
      welcome: "./package/mac/welcome.html",
      conclusion: "./package/mac/conclusion.html",
      mustClose: [appId],
    },
  },
});
