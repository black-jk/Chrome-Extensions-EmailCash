// ====================================================================================================
// [Logger]
// ====================================================================================================
import { AppConfig } from '../global';
import {LoggerData } from './data/LoggerData';

export class Logger {

  static log(msg) {
    let header = Logger.getHeader("LOG");
    LoggerData.add("log", header + msg);
    console.log("[" + AppConfig.name + "] " + header + msg);
  }

  static warn(msg) {
    let header = Logger.getHeader("WARN");
    LoggerData.add("warn", header + msg);
    console.warn("[" + AppConfig.name + "] " + header + msg);
  }

  static error(msg) {
    let header = Logger.getHeader("ERROR");
    LoggerData.add("error", header + msg);
    console.error("[" + AppConfig.name + "] " + header + msg);
  }

  static debug(msg) {
    let header = Logger.getHeader("DEBUG");
    LoggerData.add("debug", header + msg);
    console.debug("[" + AppConfig.name + "] " + header + msg);
  }

  // ----------------------------------------------------------------------------------------------------

  static getHeader(type) {
    return "[" + type + "] " + (AppConfig.version ? "[" + AppConfig.version + "] " : "") + (AppConfig.title ? "[" + AppConfig.title + "] " : "");
  }

};
