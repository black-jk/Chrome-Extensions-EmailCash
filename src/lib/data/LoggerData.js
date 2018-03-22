// ====================================================================================================
// [LoggerData]
// ====================================================================================================
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppConfig } from '../../global';
import * as AppActions from '../../constants/actions/app';

export class LoggerData {

  static _logs = [];

  static get logs() {
    return LoggerData._logs;
  }

  // ------------------------------

  static add(type, message) {
    LoggerData._logs.push(new LoggerData(type, message));
    AppConfig.store.dispatch({ type: AppActions.LOGGER, loggersCount: LoggerData.logs.length });
  }



  // ====================================================================================================

  type = "";
  message = "";

  constructor(type, message) {
    this.type = type;
    this.message = message;
  }

  // --------------------------------------------------

  getColor() {
    switch (this.type) {
      case "log":
        return "green";

      case "debug":
        return "gray";

      case "warn":
        return "orange";

      case "error":
        return "red";

      default:
        return "black";
    }
  }
};
