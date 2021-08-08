// ====================================================================================================
// [Adclick]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { DelayTimer } from '../../lib/DelayTimer';
import { Tool } from '../../lib/Tool';
import { ECTools } from '../../lib/ECTools';

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

    /// open ad-view
    let adWindow: Window;

    let now: Number = (new Date).getTime();
    if (now < EmailCacheConfig.lastAdClickedAt + 1 * 60 * 1000) {
      Logger.log("Already clicked!");
    } else {
      Logger.log(`open url: ${$href}`);
      adWindow = window.open($href, "", "width:100, height:100");
      Logger.log("Waiting for finish ...");

      EmailCacheConfig.lastAdClickedAt = (new Date).getTime();
      EmailCacheConfig.save([`lastAdClickedAt`], () => {
        Logger.log("Save lastAdClickedAt");
      });
    }

    new DelayTimer(this, this._checkFinish, [adWindow], 1000);

    new DelayTimer(this, () => {
      if (adWindow) {
        adWindow.close();
      }
      this.go_adclick(AppConfig.redirectDelay);
    }, [], 30000);
  }

  // --------------------------------------------------

  _findLink() {
    let patterns: Array = [
      "Yahoo購物中心",
      "台灣樂天",
      "momo購物網",
      "博客來",
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

    // <a href="/Rewards/DailyAdClicks.aspx?id=2158&amp;sid=tpghd355nuyy4b45nperrqm5&amp;u=ppvivian" target="_blank">博客來</a>
    let links: Array = $(`a[target='_blank']`);
    for (let i = 0; i < links.length; i++) {
      let $link = $(links[i]);
      let $href: String = $link.attr("href");
      if ($href.match(/DailyAdClicks.aspx/)) {
        return $link;
      }
    }

    return undefined;
  }

  // --------------------------------------------------

  _checkFinish(adWindow: Window) {
    EmailCacheConfig.read();
    if (ECTools.checkFinished(EmailCacheConfig.lastAdFinishedAt)) {
      Logger.log("Ad finished!");

      if (adWindow) {
        try {
          Logger.log("Close ad-view window!");
          adWindow.close();
        } catch (err) {
          console.log(err);
          debugger;
        }
      }

      // this.go_dailysurvey(AppConfig.redirectDelay);
      this.go_account(AppConfig.redirectDelay);
      return;
    }

    new DelayTimer(this, this._checkFinish, [adWindow], 1000);
  }

};
