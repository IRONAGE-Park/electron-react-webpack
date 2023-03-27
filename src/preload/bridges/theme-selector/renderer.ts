import { contextBridge, ipcRenderer } from "electron";
// Electron Renderer-process module

import {
  type ThemeSelectorApi,
  THEME_SELECTOR,
  ACTION_GET_SYSTEM_THEME,
  ACTION_PUT_SYSTEM_THEME,
  ACTION_GET_USED_THEME,
  ACTION_CHANGED_USED_THEME,
} from "@bridges/theme-selector";
// bridge messages

// 테마 선택 API 등록
const themeSelectApi: ThemeSelectorApi = {
  getSystemTheme: (): Promise<SystemTheme> =>
    ipcRenderer.invoke(ACTION_GET_SYSTEM_THEME),
  putSystemTheme: (theme: SystemTheme): Promise<SystemTheme> =>
    ipcRenderer.invoke(ACTION_PUT_SYSTEM_THEME, theme),
  getUsedTheme: (): Promise<UsedTheme> =>
    ipcRenderer.invoke(ACTION_GET_USED_THEME),
  registerUsedThemeDetector: (receiveTheme: (theme: UsedTheme) => void) =>
    ipcRenderer.on(ACTION_CHANGED_USED_THEME, (event, theme: UsedTheme) => {
      receiveTheme(theme);
    }),
};
contextBridge.exposeInMainWorld(THEME_SELECTOR, themeSelectApi);
