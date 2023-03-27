export class WindowNullError extends Error {
  constructor() {
    super("Window is Null Error");
  }
}

export class NotInitializeWindowSupervisorError extends Error {
  constructor() {
    super("WindowSupervisor is not initialize Error");
  }
}
