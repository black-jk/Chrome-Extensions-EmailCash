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

          this.trigger("event_read_complete", [this]);
        });
    } catch (e) {
      console.error(e);
    }
  }

  // ----------------------------------------------------------------------------------------------------

  save(fields: Array = null) {
    let pattern: Object = this._makePattern();
    // console.log(`[SET]`, pattern);
    chrome.storage.sync.set(pattern,
      () => {
        this.trigger("event_save_complete", [this]);
      });
  }

};



// ====================================================================================================
// [EmailCacheConfig]
// ====================================================================================================

class EmailCacheConfig_ extends ChromeStorageBase {

  debug: Boolean = false;

  redirectDelay: Number = 0;

  // ----------------------------------------------------------------------------------------------------

  _makeDefaultPattern(): Object {
    return {
      debug: this.debug,
      redirectDelay: this.redirectDelay,
    };
  }

}

const EmailCacheConfig: EmailCacheConfig_ = new EmailCacheConfig_;



// ====================================================================================================

export { EmailCacheConfig };
