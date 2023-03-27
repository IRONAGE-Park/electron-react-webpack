import type { BrowserWindow } from "electron";
// Electron Main-process modules

import MainWindow from "@main/windows/MainWindow";
// Electron Main-process Window modules

import {
  WindowNullError,
  NotInitializeWindowSupervisorError,
} from "@errors/Window.error";
// errors

interface GeneralWindows {
  main: MainWindow;
}

class WindowSupervisor {
  private static _instance: WindowSupervisor | null = null;
  public generalWindows: GeneralWindows;

  constructor(isDev: boolean) {
    this.generalWindows = {
      main: new MainWindow(isDev),
    };
  }

  public setWindowEventListener(
    callback: (windowName: string, type: "opened" | "closed") => void
  ): void {
    Object.entries(this.generalWindows).forEach(
      ([windowName, windowManager]) => {
        windowManager.addEventListener("opened", () => {
          callback(windowName, "opened");
        });
        windowManager.addEventListener("closed", () => {
          callback(windowName, "closed");
        });
      }
    );
  }

  public generalBrowserWindow(
    windowName: keyof GeneralWindows
  ): BrowserWindow | null {
    return this.generalWindows[windowName].window;
  }

  public generalMustBeBrowserWindow(
    windowName: keyof GeneralWindows
  ): BrowserWindow {
    const window = this.generalBrowserWindow(windowName);
    if (window === null) {
      throw new WindowNullError();
    }
    return window;
  }

  public resetGeneralWindow(windowName: keyof GeneralWindows): void {
    this.generalWindows[windowName].resetWindow();
  }

  public static createInstance(isDev: boolean) {
    this._instance = new WindowSupervisor(isDev);
  }

  public static get instance(): WindowSupervisor {
    if (this._instance === null) {
      throw new NotInitializeWindowSupervisorError();
    }
    return this._instance;
  }
}

export default WindowSupervisor;
