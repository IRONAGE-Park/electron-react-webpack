import { type BrowserWindow } from "electron";
// types

import WindowManagerEventEmitter from "@main/events/WindowManagerEventEmitter";
// Event Emitters

abstract class WindowManager extends WindowManagerEventEmitter {
  public window: BrowserWindow | null;

  protected constructor(protected isDev: boolean) {
    super();
    this.window = null;
  }

  protected abstract createWindow(): void;
  protected showWindow(): void {
    this.window?.show();
  }

  public closeWindow(): void {
    this.window?.close();
  }

  public resetWindow(): void {
    if (this.window === null) {
      this.createWindow();
      this.setupWindowOptions();
    } else {
      this.showWindow();
    }
    this.emitEvent("opened");
  }

  protected openDevTools() {
    if (this.isDev && this.window !== null) {
      // [DEVELOPMENT MODE]
      const { webContents } = this.window;
      webContents.openDevTools({ mode: "detach" });
    }
  }

  protected setupZoomLevel() {
    if (this.window !== null) {
      const { webContents } = this.window;
      webContents.setZoomFactor(1);
      webContents.setVisualZoomLevelLimits(1, 1);
    }
  }

  protected setupWindowOptions(): void {
    this.window?.on("ready-to-show", () => {
      this.window?.show();
    });
    this.window?.on("closed", () => {
      this.emitEvent("closed");
      this.window = null;
    });
  }
}

export default WindowManager;
