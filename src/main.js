// ====================================================================================================
// [Main]
// ====================================================================================================
import { Config } from './global';
import { Logger } from './lib/Logger';
import { Tools } from './lib/Tools';
import { ChromeStorage } from './lib/ChromeStorage';
import { Dispatcher } from './ec/Dispatcher';

ChromeStorage.init();

// --------------------------------------------------

let dailyRestartId = 0;
let timeoutRestartId = 0;

function main() {
  var location = window.location.toString();
  if (Config.debug) {
    Logger.debug("[main] location: " + location);
  }

  // ------------------------------

  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var time = (tomorrow.getTime() - now.getTime() + 60000) % 86400000;
  dailyRestartId = Tools.refresh(time, "AutoReload - Daily");
  timeoutRestartId = Tools.refresh(30000, "AutoReload - Timeout");

  $(document).ready(function () {
    Logger.debug("[AutoReload - Timeout] clear!");
    clearTimeout(timeoutRestartId);

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
