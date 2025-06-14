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
import { EmailCashDispatcher } from './ec/EmailCashDispatcher';
import { JEvent } from './lib/event/EventsDispatcher';
import { Tool } from './lib/Tool';

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

  Logger.debug(
    `\n====================================================================================================` +
    `\n[main] location: ${location}"` +
    `\n====================================================================================================`
  );

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


  // ------------------------------
  // [XXX]
  // ------------------------------
  if (location.match(/^https?:\/\/zh\.stripchat\.com\/.*/i)
    || location.match(/^https?:\/\/www\.dlsite\.com\/.*/i)
    || location.match(/^https?:\/\/t\.doujindomain\.com\/.*/i)
    || location.match(/^https?:\/\/tongren\.jp\/.*/i)
    || location.match(/^https?:\/\/javhd\.com\/.*/i)
    || location.match(/^https?:\/\/holahupa\.com\/.*/i)
    || location.match(/^https?:\/\/tw\.trip\.com\/.*/i)
    || location.match(/^https?:\/\/syacomic\.com\/.*/i)
    || location.match(/^https?:\/\/videocampaign\.co\/.*/i)
    || location.match(/^https?:\/\/crazyvideotodownload\.com\/.*/i)
    || location.match(/^https?:\/\/www.luluba.xyz\/.*/i)
    || location.match(/^https?:\/\/camssurveys.com\/.*/i)
    || location.match(/^https?:\/\/goodcoolsurvey.com\/.*/i)
  ) {
    window.close();
    return;
  }

  // ------------------------------

  $(document).ready(function () {

    // ------------------------------
    // [阿福管家] - https://alfred.camera/*
    // www.twbook.cc/*
    // hornydragon.blogspot.com/*
    // ------------------------------
    if (location.match(/^https?:\/\/www\.twbook\.cc\/.*/i) ||
        location.match(/^https?:\/\/hornydragon\.blogspot\.com\/.*/i) ||
        location.match(/^https?:\/\/alfred\.camera\/.*/i) ||

        location.match(/^https?:\/\/www\.thiscozyden\.com\/.*/i) ||
        false
    ) {
      dailyRestartTimer.cancel();
      timeoutRestartTimer.cancel();

      let intervalId = setInterval(function () {
        Tool.killAD();
      }, 1000);

      console.log("[TRACE] [AUTO-KILL-AD] set interval: ", intervalId);
      return;
    }

    // ------------------------------
    // [YouTube] - https://www.youtube.com/watch*
    // ------------------------------
    if (location.match(/^https?:\/\/www\.youtube\.com\/watch/i)) {
      dailyRestartTimer.cancel();
      timeoutRestartTimer.cancel();

      let intervalId = setInterval(function () {
        var btns = document.getElementsByClassName("ytp-ad-overlay-close-button");
        for (var i = 0; i < btns.length; i++) {
          console.log(btns[i]);
          try {
            btns[i].click();
          } catch (e) {
          }
        }

        // ------------------------------

        var btns = document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text");
        for (var i = 0; i < btns.length; i++) {
          console.log(btns[i]);
          try {
            btns[i].click();
          } catch (e) {
          }
        }

        // ------------------------------

        var fadblock = $('#fadblock-popup #close-modal').click();
        if (fadblock.length > 0) {
          console.log(`[TRACE] [Kill fadblock]`, fadblock);
        }
      }, 100);

      console.log("[YT-AD] set interval: ", intervalId);
      return;
    }

    // ------------------------------
    // [EmailCash]
    // ------------------------------
    if (location.match(/emailcash/i)) {
      let intervalId = setInterval(function () {
        var divs = $("div[aria-label='關閉廣告']").click();
        if (divs.length > 0) {
          console.log(`[TRACE] [Click 關閉廣告]`, divs);
        }

        Tool.killAD();
      }, 1000);

      console.log("[EC-AD] set interval: ", intervalId);
    }

    // ------------------------------

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

    EmailCashDispatcher.execute();
  });
};
