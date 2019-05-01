// ====================================================================================================
// [Mail]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class MailOperator extends Operator {

  title: String = "查看郵件獎勵";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    /*
      <tr>
        <td class="text-left"><a target="_blank" href="/Rewards/MailDetail.aspx?uid=w214nt8f4f2o&amp;aid={6F53C928-D7C4-45C5-8A91-3979BAC38E51}">2019-05月電子報</a></td>
        <td>2019/05/01</td>
        <td>未閱讀</td>
      </tr>
    */

    let test: Boolean = /*/ true /*/ false /**/;

    let pattern: String = (test) ? "已獎勵" : "未閱讀";
    let $links = $(`div[class='table-responsive mail'] tr:contains('${pattern}')`).find("a");
    if ($links.length == 0) {
      this.go_account(AppConfig.redirectDelay);
      return;
    }

    let href: String = $links.attr("href");
    Logger.log(`找到新郵件: ${$links.text().trim()}`);
    Logger.log(`  URL = ${href}`);

    // ------------------------------

    let mailWindow: Window;

    // callback function for mail-click
    window.onMailClosed = () => {
      Logger.log('[onMailClosed] callback');
      mailWindow.close();

      // this.go_account(AppConfig.redirectDelay);
      this.go_mail(AppConfig.redirectDelay);  // reload
    };

    /// open mail-click url
    let openMailDetailWindow: Function = function () {
      if (mailWindow != null) {
        if (mailWindow.mailFinished) {
          Logger.log("Mail finished, continue to next step.");
          window.onMailClosed();
          return;
        } else {
          Logger.warn("Retry mail-click");
          mailWindow.close();
        }
      }

      Logger.log(`開啟郵件: '${href}'  (waiting for callback)`);
      mailWindow = window.open(href, "_blank");
      mailWindow.mailFinished = false;
      Logger.log("Waiting for callback ...");
    };

    openMailDetailWindow();

    // ------------------------------

    /// set timeout for retry
    window.setInterval(function () {
      Logger.warn("Timeup. Call openMailDetailWindow() again.");
      openMailDetailWindow();
    }, 60000);
  }

};
