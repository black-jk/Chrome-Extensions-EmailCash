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
    <div class="tr_Cb2light txt_bold">
        <div class="td"><a target="_blank" href="MailDetail.aspx?uid=w214nt8f4f2o&amp;aid={8EAA7DE8-C93A-40A4-9535-A71F5D132FA1}">無底價競標，蘋果iPad送給你</a></div>
        <div class="td">2017/07/03</div>
        <div class="td">未閱讀</div>
    </div>
    */

    let test: Boolean = /*/ true /*/ false /**/;

    let pattern: String = (test) ? "已獎勵" : "未閱讀";
    let $links = $(`div[class='td']:contains('${pattern}')`).parent().find("a");
    if ($links.length == 0) {
      this.go_account(AppConfig.redirectDelay);
      return;
    }

    Logger.log($links.text().trim());

    let href: String = $links.attr("href");
    Logger.log(href);

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

      Logger.log(`open url: '${href}'  (waiting for callback)`);
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
