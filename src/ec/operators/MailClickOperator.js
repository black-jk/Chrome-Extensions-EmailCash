// ====================================================================================================
// [MailClick]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class MailClickOperator extends Operator {

  title: String = "郵件獎勵: Click";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    /*
    <span id="sViewStatus">
      <span class="fbNeg"><img src="/images/rewards/dailyAdvertising/topFrameCrossBox.gif" align="absmiddle" border="0" vspace="2">此封信件 e 元獎勵已入帳</span>
    </span>
    */

    window.ecMailClick = function () {
      // [check finished]

      // [TODO] 已加入您的EmailCash帳戶 -> ?
      let $span = $("#sViewStatus").find("span[class='fbNeg']:contains('此封信件 e 元獎勵已入帳'),span[class='fbPos']:contains('已加入您的EmailCash帳戶')");
      if ($span.length > 0) {
        Logger.debug($span.prop("outerHTML"));
        Logger.log('mail-click finished');

        window.mailFinished = true;

        try {
          Logger.log('call window.opener.onMailClosed()');
          window.opener.onMailClosed();
          Logger.log('call window.opener.onMailClosed() - success');

          // reload for close window
          let delayId: Number = window.setInterval(function () {
            Logger.debug('call window.location.reload()');
            window.location.reload();
            window.clearInterval(delayId);
          }, 1000);
        } catch (e) {
          Logger.error(e);
          window.close();
        }
        return;
      }

      // ------------------------------

      /// retry later
      Logger.warn("Retry later ...");
      window.setTimeout(window.ecMailClick, 1000);
    };
    window.ecMailClick();
  }

};
