// ====================================================================================================
// [ChromeStorage]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from '../lib/Logger';
import { EventsDispatcher } from './event/EventsDispatcher';

class ChromeStorageBase extends EventsDispatcher {

  // [properties]
  /// key: defaultValue

  // ----------------------------------------------------------------------------------------------------

  _makePattern(fields: Array = null): Object {
    if (!fields || fields.length == 0) {
      return this._makeDefaultPattern();
    }

    let pattern: Object = {
      /// key: this.defaultValue, ...
    };
    fields.forEach((key: String) => {
      pattern[key] = this[key];
    });
    return pattern;
  }

  // --------------------------------------------------

  _makeDefaultPattern(): Object {
    return {};
  }

  // --------------------------------------------------

  read() {
    try {
      let pattern: Object = this._makePattern();
      // console.log(`[GET]`, pattern);
      chrome.storage.sync.get(pattern,
        (items: Object) => {
          // console.log(`[GET] [items]`, items);
          for (let key in pattern) {
            this[key] = items[key];
          }

          this.trigger("event_read_complete");
        });
    } catch (e) {
      console.error(e);
    }
  }

  // ----------------------------------------------------------------------------------------------------

  save(fields: Array = null, callback: Function = null) {
    let pattern: Object = this._makePattern(fields);
    chrome.storage.sync.set(pattern,
      () => {
        if (typeof callback == "function") {
          callback();
        }
        this.trigger("event_save_complete");
      });
  }

};



// ====================================================================================================
// [EmailCacheConfig]
// ====================================================================================================

class EmailCacheConfig_ extends ChromeStorageBase {

  debug: Boolean = false;

  pause: Boolean = false;

  startTimeout: Number = 30; // sec
  refreshDelay: Number = 5;  // sec

  redirectDelay: Boolean = false;
  redirectDelayTime: Number = 0;

  lastAdClickedAt: Number = 0;   // 每日廣告
  lastDailySurveyAt: Number = 0; // 每日問答
  lastDailyGameAt: Number = 0;   // 以小搏大
  lastSurveyAt: Number = 0;      // 問卷

  // ----------------------------------------------------------------------------------------------------

  _makeDefaultPattern(): Object {
    return {
      debug: this.debug,

      pause: this.pause,

      startTimeout: this.startTimeout,
      refreshDelay: this.refreshDelay,

      redirectDelay: this.redirectDelay,
      redirectDelayTime: this.redirectDelayTime,

      lastAdClickedAt: this.lastAdClickedAt,
      lastDailySurveyAt: this.lastDailySurveyAt,
      lastDailyGameAt: this.lastDailyGameAt,
      lastSurveyAt: this.lastSurveyAt,
    };
  }

}

const EmailCacheConfig: EmailCacheConfig_ = new EmailCacheConfig_;



// ====================================================================================================

export { EmailCacheConfig };
