/** `App Theme` message 선택자 */
export const THEME_SELECTOR = "theme" as const;

/** `App System Theme`를 갖고 오는 Action */
export const ACTION_GET_SYSTEM_THEME =
  `${THEME_SELECTOR}:get-system-theme` as const;
/** `App System Theme`를 변경하는 Action */
export const ACTION_PUT_SYSTEM_THEME =
  `${THEME_SELECTOR}:put-system-theme` as const;
/** `App Used Theme`를 갖고 오는 Action */
export const ACTION_GET_USED_THEME =
  `${THEME_SELECTOR}:get-used-theme` as const;
/** `App Theme`가 변경됐을 때 발생하는 Action */
export const ACTION_CHANGED_USED_THEME =
  `${THEME_SELECTOR}:changed-used-theme` as const;
// bridge messages

/** `App Theme` 선택 API의 Function interface */
export interface ThemeSelectorApi {
  /**
   * 현재 `App System Theme` 가져오는 Function
   */
  getSystemTheme: () => Promise<SystemTheme>;
  /**
   * `App System Theme`를 변경하는 Function
   *
   * @param theme 변경할 `App System Theme`
   */
  putSystemTheme: (theme: SystemTheme) => Promise<SystemTheme>;
  /**
   * `App Used Theme`를 가져오는 Function
   */
  getUsedTheme: () => Promise<UsedTheme>;
  /**
   * `App Used Theme`가 변경될 때마다 받을 `IPC Listener`를 등록하는 Function
   *
   * @param receiveTheme 변경 시 실행할 callback Function
   */
  registerUsedThemeDetector: (
    /**
     * `App Used Theme` 변경 시 실행할 callback Function으로
     * 매개변수로 변경된 `App Used Theme`가 넘어옴
     *
     * @param theme 변경된 `App Used Theme`
     */
    receiveUsedTheme: (theme: UsedTheme) => void
  ) => void;
}
