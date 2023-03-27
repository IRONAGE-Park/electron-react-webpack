import path from "path";
// Node.js modules

import { BrowserWindow } from "electron";
// Electron Main-process modules

import WindowManager from "@main/windows/WindowManager";
// Electron Windows modules

/** window URL */
const LOAD_URL = "main";
// 상수 정의

class SettingWindow extends WindowManager {
  private page: string;
  /** '`SettingWindow` 관리자 생성자' */
  constructor(isDev: boolean) {
    super(isDev);
    this.page = "";
  }

  public createWindow(): void {
    // 최근 모드의 사이즈를 켬
    this.window = new BrowserWindow({
      title: "Main - Electron React Webpack",
      width: 600,
      height: 600,
      center: true,
      resizable: false,
      roundedCorners: true,
      show: false,
      frame: false,
      closable: true,
      webPreferences: {
        devTools: this.isDev, // [DEVELOPMENT MODE]
        zoomFactor: 1.0,
        preload: path.resolve(__dirname, `./preloads/${LOAD_URL}.js`),
        // navigateOnDragDrop: true,
      },
    });

    if (this.isDev) {
      // [DEVELOPMENT MODE]
      this.window.loadURL(`http://localhost:3000/${LOAD_URL}/#/${this.page}`);
    } else {
      // [PRODUCTION MODE]
      this.window.loadFile(path.resolve(__dirname, `./${LOAD_URL}.html`), {
        hash: `/${this.page}`,
      });
    }

    const { webContents } = this.window;

    webContents.on("did-finish-load", () => {
      this.setupZoomLevel();
      this.openDevTools();
    });
  }
}

export default SettingWindow;
