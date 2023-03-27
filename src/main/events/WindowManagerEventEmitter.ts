import { EventEmitter } from "events";
// Node.js modules

class WindowManagerEventEmitter extends EventEmitter {
  public addEventListener(event: "opened", callback: () => void): void;
  public addEventListener(event: "closed", callback: () => void): void;
  public addEventListener(event: string, callback: () => void) {
    this.addListener(event, callback);
  }

  public emitEvent(event: "opened"): void;
  public emitEvent(event: "closed"): void;
  public emitEvent(event: string) {
    this.emit(event);
  }
}

export default WindowManagerEventEmitter;
