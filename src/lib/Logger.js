// ====================================================================================================
// [Logger]
// ====================================================================================================
import { Config } from '../global';

export class Logger {

  static log(msg) {
    console.log(Logger.getHeader("LOG") + msg);
  }

  static warn(msg) {
    console.warn(Logger.getHeader("WARN") + msg);
  }

  static error(msg) {
    console.error(Logger.getHeader("ERROR") + msg);
  }

  static debug(msg) {
    console.debug(Logger.getHeader("DEBUG") + msg);
  }

  // ----------------------------------------------------------------------------------------------------

  static getHeader(type) {
    return "[" + Config.name + "] [" + type + "] " + (Config.version ? "[" + Config.version + "] " : "") + (Config.title ? "[" + Config.title + "] " : "");
  }

};
