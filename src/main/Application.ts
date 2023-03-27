import { app } from "electron";
import log from "electron-log";
// Electron Main-process modules

import WindowSupervisor from "@main/windows/WindowSupervisor";
// Electron Main-process Window modules

import EnvironmentGetter from "@libs/EnvironmentGetter";
// common libraries

class Application {
  constructor(
    private appName: string,
    private userDatePath: string,
    private isDev: boolean
  ) {}

  private registerProcessHandle() {
    process.on("uncaughtException", error =>
      console.error("uncaughtException:", error)
    );
    process.on("unhandledRejection", error =>
      console.error("unhandledRejection:", error)
    );
    process.on("rejectionHandled", error =>
      console.error("rejectionHandled:", error)
    );
  }

  private initModules() {
    const isMac = EnvironmentGetter.getMainIsMac();
    if (!isMac) {
      // [WINDOWS]
      app.setAppUserModelId(app.name);
    }
    WindowSupervisor.createInstance(this.isDev);
  }

  private registerLogManager(isRegister: boolean) {
    if (isRegister) {
      // Electron Log Control.
      Object.assign(console, log.functions);
    }
  }

  private onReady() {
    WindowSupervisor.instance.resetGeneralWindow("main");
  }
  private onActivate() {}
  private onWindowAllClosed() {}
  private onBeforeQuit() {}
  private onQuit() {}

  public run() {
    this.registerLogManager(app.isPackaged);
    this.registerProcessHandle();
    this.initModules();

    app
      .on("ready", () => {
        /** `App`이 실행 후 준비 상태가 될 때 callback */
        this.onReady();
      })
      .on("activate", () => {
        /** `App`이 활성화될 때 callback */
        this.onActivate();
      })
      .on("window-all-closed", () => {
        /** 모든 `Window`가 종료되었을 때 callback */
        this.onWindowAllClosed();
      })
      .on("before-quit", () => {
        this.onBeforeQuit();
      })
      .on("quit", () => {
        this.onQuit();
      });
  }
}

export default Application;
