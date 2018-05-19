// ====================================================================================================
// [Main]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppConfig } from './global';
import { HotKeyManager } from './global';
import { Logger } from './lib/Logger';
import { ECTools } from './lib/ECTools';
import { DelayTimer } from './lib/DelayTimer';
import { EmailCacheConfig } from './lib/ChromeStorage';
import { AppContainer } from './redux/containers/AppContainer';
import { Dispatcher } from './ec/Dispatcher';
import { JEvent } from './lib/event/EventsDispatcher';

// ----------------------------------------------------------------------------------------------------

EmailCacheConfig.read();
EmailCacheConfig.on("event_read_complete", (event: JEvent) => {
  event.off();

  AppConfig.debug = EmailCacheConfig.debug;
  AppConfig.redirectDelay = (EmailCacheConfig.redirectDelay) ? EmailCacheConfig.redirectDelayTime : 0;
  // console.debug(AppConfig, EmailCacheConfig);

  if (window.jQuery) {
    main();
  } else {
    Logger.debug("Load jQuery");
    window.onload = function () {
      ECTools.loadJQuery(function () {
        // do nothing
      });
      main();
    };
  }
});

// ----------------------------------------------------------------------------------------------------

function main() {
  let location = window.location.toString();
  if (AppConfig.debug) {
    Logger.debug("[main] location: " + location);
  }

  // ------------------------------

  let refreshDelay: Number = EmailCacheConfig.refreshDelay * 1000;
  let startTimeout: Number = EmailCacheConfig.startTimeout * 1000;

  let now: Date = new Date();
  let nowTime: Number = now.getTime();
  let tomorrow: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  let tomorrowTime: Number = tomorrow.getTime();
  let refreshTime: Number = (tomorrowTime - nowTime + refreshDelay) % 86400000;

  AppConfig.dailyRestartAt = nowTime + refreshTime;
  AppConfig.timeoutRestartAt = nowTime + startTimeout;

  let dailyRestartTimer: DelayTimer = ECTools.redirect(refreshTime, "https://www.emailcash.com.tw/");
  let timeoutRestartTimer: DelayTimer = ECTools.redirect(startTimeout, "");

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
      document.getElementById("root")
    );

    Dispatcher.execute();
  });
};
