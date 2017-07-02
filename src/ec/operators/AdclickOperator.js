// ====================================================================================================
// [Adclick]
// ====================================================================================================
import { Config } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class AdclickOperator extends Operator {

  title = "每日廣告";



  // ----------------------------------------------------------------------------------------------------

  /// <a href="view_adc.asp?id=1711&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="UDN買東西">UDN買東西</a>
  /// <a href="view_adc.asp?id=1895&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="IKEA 櫥櫃收納">IKEA 櫥櫃收納</a>

  operation() {
    const thisObject = this;

    let $href = this._findLink();
    if (!$href) {
      Logger.debug("Ad link not found! Retry ...");
      this.go_adclick(Config.redirectDelay);
      return;
    }

    // ------------------------------

    let adWindow;

    // callback function for ad-view
    window.onAdClosed = function () {
      Logger.log('[onAdClosed] callback');
      adWindow.close();
      thisObject.go_earn(Config.redirectDelay);
    };

    /// open ad-view url
    var openAdWindow = function () {
      if (adWindow != null) {
        if (adWindow.adFinished) {
          Logger.debug("Ad finished, continue to next step.");
          window.onAdClosed();
          return;
        } else {
          Logger.debug("Retry ad-view");
          adWindow.close();
        }
      }

      Logger.log("open url: '" + $href + "'  (waiting for callback)");
      adWindow = window.open($href, "", "width:100, height:100");
      adWindow.adFinished = false;
      Logger.debug("Waiting for callback ...");
    };
    openAdWindow();

    /// set timeout for retry
    window.setInterval(function () {
      Logger.debug("Timeup. Call openAdWindow() again.");
      openAdWindow();
    }, 60000);
  }

  // --------------------------------------------------

  _findLink() {
    let patterns = [
      "UDN買東西",
      "IKEA 櫥櫃收納",
      "momo購物超划算"
    ];

    for (var i in patterns) {
      Logger.debug("[AdclickOperator._findLink()] '" + pattern + "'");

      var pattern = patterns[i];
      $href = $("a[title='" + pattern + "'][target='_blank']:contains('" + pattern + "')").attr("href");
      if ($href != "undefined" && $href != undefined && $href.length > 0) {
        return $href;
      }

      Logger.debug("[AdclickOperator._findLink()] '" + pattern + "' (Missing. Try next ...");
    }

    return undefined;
  }

};
