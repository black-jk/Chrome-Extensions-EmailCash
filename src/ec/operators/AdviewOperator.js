// ====================================================================================================
// [Adview]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { ECTools } from '../../lib/ECTools';
import { DelayTimer } from '../../lib/DelayTimer';

export class AdviewOperator extends Operator {

  title: String = "每日廣告 VIEW";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    window.ecAdview = () => {
      // check finished

      /*
        <div class="col-xs-6 text-center" id="sViewStatus">
          <p class="red_w">
            <span class="glyphicon glyphicon-remove"></span>
            廣告e元獎勵已入帳
          </p>
        </div>
      */
      let $span = $("#sViewStatus").find("p[class='red_w']:contains('廣告e元獎勵已入帳'),p[class='red_w']:contains('已加入您的EmailCash帳戶')");
      if ($span.length > 0) {
        Logger.debug($span.prop("outerHTML"));
        Logger.log('ad finished');

        window.adFinished = true;

        try {
          Logger.log('call window.opener.onAdClosed()');
          window.opener.onAdClosed();
          Logger.log('call window.opener.onAdClosed() - success');

          // reload for close window
          let delayId: Number = window.setInterval(function () {
            Logger.debug('call window.location.reload()');
            window.location.reload();
            window.clearInterval(delayId);
          }, 1000);
        } catch (e) {
          Logger.error(e);
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
        let second = parseInt($obj.text());
        if (second > 1) {
          $obj.text("1");
        }
        Logger.debug("curSec: " + second);
      }
      */

      /// retry later
      Logger.warn("Retry later ...");
      window.setTimeout(window.ecAdview, 1000);
    };
    window.ecAdview();

    // ECTools.redirect(20000);
    new DelayTimer(this, () => {
      window.close();
    }, [], 20000);

    window.alert = (message) => {
      Logger.log(message);
    }
  }

};
