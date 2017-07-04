// ====================================================================================================
// [Logger]
// ====================================================================================================
import { AppConfig } from '../global';
import {LoggerData } from './data/LoggerData';

export class Logger {

  static log(msg) {
    let header = Logger.getHeader("LOG");
    LoggerData.add("log", header + msg);
    console.log(header + msg);
  }

  static warn(msg) {
    let header = Logger.getHeader("WARN");
    LoggerData.add("warn", header + msg);
    console.warn(header + msg);
  }

  static error(msg) {
    let header = Logger.getHeader("ERROR");
    LoggerData.add("error", header + msg);
    console.error(header + msg);
  }

  static debug(msg) {
    let header = Logger.getHeader("DEBUG");
    LoggerData.add("debug", header + msg);
    console.debug(header + msg);
  }

  // ----------------------------------------------------------------------------------------------------

  static getHeader(type) {
    return "[" + AppConfig.name + "] [" + type + "] " + (AppConfig.version ? "[" + AppConfig.version + "] " : "") + (AppConfig.title ? "[" + AppConfig.title + "] " : "");
  }

};
