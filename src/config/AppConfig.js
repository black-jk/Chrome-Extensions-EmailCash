// ====================================================================================================
// [AppConfig]
// ====================================================================================================
require("babel-polyfill");
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as ENV from '../constants/env';
import appReducer from '../reducers';

export default class AppConfig {

  name = "EmailCashOperator";

  title = null;

  version = "3.0.0";

  debug = /*/ true /*/ false /**/;

  redirectDelay = /*/ 3000 /*/ 0 /**/;



  // ----------------------------------------------------------------------------------------------------
  // [ENV]
  // ----------------------------------------------------------------------------------------------------

  env = /**/ process.env.NODE_ENV /*/ ENV.PRODUCTION /**/;



  // ----------------------------------------------------------------------------------------------------
  // [Redux]
  // ----------------------------------------------------------------------------------------------------

  store = null;



  // ----------------------------------------------------------------------------------------------------

  constructor() {
    const middlewares = [];

    if (this.env == ENV.DEVELOPMENT) {
      /// redux-logger - http://ithelp.ithome.com.tw/articles/10187344
      const logger = createLogger({ duration: true });
      middlewares.push(logger);
    }

    this.store = createStore(
      appReducer,
//      { app: {}},
      composeWithDevTools(
        applyMiddleware(...middlewares)
      ),
    );
  }



  // ----------------------------------------------------------------------------------------------------

};
