// ====================================================================================================
// [AppConfig]
// ====================================================================================================
require("babel-polyfill");
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as ENV from '../constants/env';
import appReducer from '../reducers';
import { Operator } from "../ec/operators/Operator";

export default class AppConfig {

  name: String = "EmailCashOperator";

  version: String = "3.0.0";



  // ----------------------------------------------------------------------------------------------------
  // [ENV]
  // ----------------------------------------------------------------------------------------------------

  env = /**/ process.env.NODE_ENV /*/ ENV.PRODUCTION /**/;



  // ----------------------------------------------------------------------------------------------------
  // [Auto Reload]
  // ----------------------------------------------------------------------------------------------------

  dailyRestartAt: Number = 0;

  timeoutRestartAt: Number = 0;



  // ----------------------------------------------------------------------------------------------------
  // [Options]
  // ----------------------------------------------------------------------------------------------------

  debug: Boolean = /*/ true /*/ false /**/;

  redirectDelay: Number = /*/ 3000 /*/ 0 /**/;



  // ----------------------------------------------------------------------------------------------------
  // [Operator]
  // ----------------------------------------------------------------------------------------------------

  _title: String = null;

  _operator: Operator = null;

  // --------------------------------------------------

  get operator(): Operator {
    return this._operator;
  }

  set operator(value: Operator) {
    this._operator = value;
    this._title = value.title;
  }

  // --------------------------------------------------

  get title(): String {
    return this._title;
  }



  // ----------------------------------------------------------------------------------------------------
  // [Redux]
  // ----------------------------------------------------------------------------------------------------

  store = null;



  // ----------------------------------------------------------------------------------------------------

  constructor() {
    const middlewares: Array = [];

    // if (this.env == ENV.DEVELOPMENT) {
    //   /// redux-logger - http://ithelp.ithome.com.tw/articles/10187344
    //   const logger = createLogger({ duration: true });
    //   middlewares.push(logger);
    // }

    this.store = createStore(
      appReducer,
      composeWithDevTools(
        applyMiddleware(...middlewares)
      ),
    );
  }

};
