import { app } from "electron";
import isDev from "electron-is-dev";
// Electron Main-process module

import Application from "@main/Application";
// Application

const application = new Application(
  app.getName(),
  app.getPath("userData"),
  isDev
);

application.run();
