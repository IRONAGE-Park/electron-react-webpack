/**
 * Common Library
 *
 * `Main-process` 혹은 `Renderer-process`에서 현재 실행되고 있는
 * OS 환경을 가져오는 기능 모음
 */
namespace EnvironmentGetter {
  export const getMainIsMac = (): boolean => {
    return getMainPlatform() === "darwin";
  };

  export const getRendererIsMac = (): boolean => {
    return /Mac OS/.test(navigator.userAgent);
  };

  export const getMainPlatform = (): NodeJS.Platform => {
    return process.platform;
  };

  export const getRendererPlatform = (): NodeJS.Platform => {
    return getRendererIsMac() ? "darwin" : "win32";
  };

  export const getMainOperationSystem = (): OperatingSystem => {
    return getMainIsMac() ? "macOS" : "Windows";
  };

  export const getRendererOperationSystem = (): OperatingSystem => {
    return getRendererIsMac() ? "macOS" : "Windows";
  };
}

export default EnvironmentGetter;
