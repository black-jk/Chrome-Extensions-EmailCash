// ====================================================================================================
// [ChromeStorage]
// ====================================================================================================
import { Config } from '../global';
import { Logger } from '../lib/Logger';

export class ChromeStorage {

  static init() {
    // [chrome.storage]
    chrome.storage.sync.get({
      debug: false,
      redirect_delay: 0
    }, function (items) {
      Config.debug = items.debug;
      Config.redirectDelay = items.redirect_delay;
      Logger.debug("[ChromeStorage] [Config]", Config);
      console.debug(Config);
    });
  }

};