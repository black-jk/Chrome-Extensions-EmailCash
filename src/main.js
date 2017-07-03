// ====================================================================================================
// [Main]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { AppConfig } from './global';
import { Logger } from './lib/Logger';
import { Tools } from './lib/Tools';
import { ChromeStorage } from './lib/ChromeStorage';
import AppContainer from './containers/AppContainer';
import { Dispatcher } from './ec/Dispatcher';

ChromeStorage.init();

// --------------------------------------------------

let dailyRestartId = 0;
let timeoutRestartId = 0;

function main() {
  var location = window.location.toString();
  if (AppConfig.debug) {
    Logger.debug("[main] location: " + location);
  }

  // ------------------------------

  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var time = (tomorrow.getTime() - now.getTime() + 60000) % 86400000;
  dailyRestartId = Tools.refresh(time, "AutoReload - Daily");
  timeoutRestartId = Tools.refresh(30000, "AutoReload - Timeout");

  $(document).ready(function () {
    require('./css/main.css');

    Logger.debug("[AutoReload - Timeout] clear!");
    clearTimeout(timeoutRestartId);

    let root = document.createElement("div");
    root.setAttribute("id", "root");

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(root);

    ReactDOM.render(
      <Provider store={AppConfig.store}>
        <AppContainer />
      </Provider>,
      document.getElementById('root')
    );

    Dispatcher.execute();
  });
};

// ----------------------------------------------------------------------------------------------------

if (window.jQuery) {
  main();
} else {
  Logger.debug('Load jQuery');
  window.onload = function () {
    Tools.loadJQuery(function () {
      // do nothing
    });
    main();
  };
}



// ----------------------------------------------------------------------------------------------------
