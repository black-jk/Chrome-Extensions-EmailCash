// ====================================================================================================
// [ChromeStorage]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from '../lib/Logger';

export class ChromeStorage {

  static init() {
    // [chrome.storage]
    chrome.storage.sync.get({
      debug: false,
      redirect_delay: 0
    }, function (items) {
      AppConfig.debug = items.debug;
      AppConfig.redirectDelay = items.redirect_delay;
      console.debug(AppConfig);
    });
  }

};
