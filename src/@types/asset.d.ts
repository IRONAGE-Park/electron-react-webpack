declare module "*.icns";
declare module "*.ico";

/** 길이 고정 배열 */
declare type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (
  ...a: infer X
) => void
  ? X
  : never;
/** 길이 고정 배열 */
declare type GrowToSize<T, A extends Array<T>, N extends number> = {
  0: A;
  1: GrowToSize<T, Grow<T, A>, N>;
}[A["length"] extends N ? 0 : 1];
/** 길이 고정 배열 */
declare type FixedArray<T, N extends number> = GrowToSize<T, [], N>;

/** 좌표 */
interface Point {
  /** 도형의 x 좌표 */
  x: number;
  /** 도형의 y 좌표 */
  y: number;
}

/** 크기 */
interface Size {
  /** 도형의 넓이 */
  width: number;
  /** 도형의 높이 */
  height: number;
}

/** 사각 도형 */
interface Rect extends Point, Size {}

/** 크기를 선택적으로 저장하는 사각 도형 */
interface OptionalRect extends Point, Partial<Size> {}

declare type OperatingSystem = "Public" | "Windows" | "macOS";
