// ====================================================================================================
// [Adclick]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { DelayTimer } from '../../lib/DelayTimer';
import { Tool } from '../../lib/Tool';

export class AdclickOperator extends Operator {

  title: String = "每日廣告";



  // ----------------------------------------------------------------------------------------------------

  /// <a href="view_adc.asp?id=1711&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="UDN買東西">UDN買東西</a>
  /// <a href="view_adc.asp?id=1895&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="IKEA 櫥櫃收納">IKEA 櫥櫃收納</a>

  operation() {
    let $href = this._findLink();
    if (!$href) {
      Logger.log("Ad link not found! Retry ...");
      this.go_adclick(AppConfig.redirectDelay);
      return;
    }

    // ------------------------------

    let adWindow: Window;

    // callback function for ad-view
    window.onAdClosed = () => {
      Logger.log('[onAdClosed] callback');
      try {
        adWindow.close();
      } catch (e) {
        Logger.error(e);
      }

      EmailCacheConfig.lastAdClickedAt = (new Date).getTime();
      EmailCacheConfig.save([`lastAdClickedAt`], () => {
        this.go_dailysurvey(AppConfig.redirectDelay);
      });
    };

    /// open ad-view url
    let openAdWindow: Function = () => {
      if (adWindow != null) {
        if (adWindow.adFinished) {
          Logger.log("Ad finished, continue to next step.");
          window.onAdClosed();
          return;
        } else {
          Logger.warn("Retry ad-view");
          try {
            adWindow.close();
          } catch (e) {
            Logger.error(e);
          }
        }
      }

      Logger.log("open url: '" + $href + "'  (waiting for callback)");
      adWindow = window.open($href, "", "width:100, height:100");
      adWindow.adFinished = false;
      Logger.log("Waiting for callback ...");
    };

    openAdWindow();

    /// set timeout for retry
    /*
    window.setInterval(function () {
      Logger.warn("Timeup. Call openAdWindow() again.");
      openAdWindow();
    }, 60000);
    */

    new DelayTimer(this, () => {
      Logger.log("Skip! go next ...");
      this.go_dailysurvey(AppConfig.redirectDelay);
    }, [], 10000);
  }

  // --------------------------------------------------

  _findLink() {
    let patterns: Array = [
      "UDN買東西",
      "IKEA 櫥櫃收納",
      "momo購物超划算"
    ];

    for (let i in patterns) {
      Logger.debug(`[AdclickOperator._findLink()] '${pattern}'`);

      let pattern: String = patterns[i];
      let $href: String = $(`a[target='_blank']:contains('${pattern}')`).attr("href");
      if ($href != "undefined" && $href != undefined && $href.length > 0) {
        return $href;
      }

      Logger.debug(`[AdclickOperator._findLink()] '${pattern}' Missing. (Try next ...)`);
    }

    return undefined;
  }

};
