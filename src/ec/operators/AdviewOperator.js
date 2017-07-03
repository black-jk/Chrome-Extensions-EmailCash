// ====================================================================================================
// [Adview]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class AdviewOperator extends Operator {

  title = "每日廣告 VIEW";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    window.ecAdview = function () {
      // check finished
      var $span = $("#sViewStatus").find("span[class='fbNeg']:contains('廣告e元獎勵已入帳'),span[class='fbPos']:contains('已加入您的EmailCash帳戶')");
      if ($span.length > 0) {
        Logger.log($span.text().trim());
        Logger.debug('ad finished');

        window.adFinished = true;

        try {
          Logger.debug('call window.opener.onAdClosed()');
          window.opener.onAdClosed();

          // reload for close window
          var delayId = window.setInterval(function () {
            Logger.debug('call window.location.reload()');
            window.location.reload();
            window.clearInterval(delayId);
          }, 1000);
        } catch (e) {
          Logger.log(e);
          /*
          if (window.opener.location.pathname == "/4G/Rewards/DailyAdvertising.aspx") {
            if (AppConfig.debug && confirm("[Error] " + e.message + "\n\nKeep window for debug?")) {
              return;
            }
          }
          */
          window.close();
        }
        return;
      }

      // ------------------------------

      /// set focus
      $("#frameTop").attr("value", "1");

      /// jump second
      /*
      $obj = $("#curSec");
      if ($obj.length > 0) {
        var second = parseInt($obj.text());
        if (second > 1) {
          $obj.text("1");
        }
        Logger.debug("curSec: " + second);
      }
      */

      /// retry later
      Logger.debug("Retry later ...");
      window.setTimeout(window.ecAdview, 1000);
    };
    window.ecAdview();
  }

};
