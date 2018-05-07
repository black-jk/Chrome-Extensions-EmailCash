// ====================================================================================================
// [Main]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppConfig } from './global';
import { HotKeyManager } from './global';
import { Logger } from './lib/Logger';
import { Tools } from './lib/Tools';
import { DelayTimer } from './lib/DelayTimer';
import { EmailCacheConfig } from './lib/ChromeStorage';
import AppContainer from './containers/AppContainer';
import { Dispatcher } from './ec/Dispatcher';

// ----------------------------------------------------------------------------------------------------

let dailyRestartTimer: DelayTimer = 0;
let timeoutRestartTimer: DelayTimer = 0;

function main() {
  let location = window.location.toString();
  if (AppConfig.debug) {
    Logger.debug("[main] location: " + location);
  }

  // ------------------------------

  let now: Date = new Date();
  let nowTime: Number = now.getTime();
  let tomorrow: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  let time: Number = (tomorrow.getTime() - nowTime + 90000) % 86400000;

  dailyRestartTimer = Tools.redirect(time, "https://www.emailcash.com.tw/");
  AppConfig.dailyRestartAt = nowTime + time;

  timeoutRestartTimer = Tools.redirect(30000, "");
  AppConfig.timeoutRestartAt = nowTime + 30000;

  $(document).ready(function () {
    require('./css/main.css');

    Logger.debug("[AutoReload - Timeout] clear!");
    timeoutRestartTimer.cancel();
    AppConfig.timeoutRestartAt = 0;

    let root: HTMLDivElement = document.createElement("div");
    root.setAttribute("id", "root");

    let body: HTMLBodyElement = document.getElementsByTagName("body")[0];
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

EmailCacheConfig.read();
EmailCacheConfig.on("event_read_complete", () => {
  AppConfig.debug = EmailCacheConfig.debug;
  AppConfig.redirectDelay = EmailCacheConfig.redirectDelay;
  console.debug(AppConfig, EmailCacheConfig);

  // [test]
  // try {
  //   EmailCacheConfig.test += 1;
  //   EmailCacheConfig.save();
  //   EmailCacheConfig.on("event_save_complete", () => {
  //     console.debug(AppConfig, EmailCacheConfig);
  //   });
  // } catch (e) {
  //   console.log(`[error]`, e);
  // }

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

});
