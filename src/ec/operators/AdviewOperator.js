// ====================================================================================================
// [Adview]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { ECTools } from '../../lib/ECTools';
import { DelayTimer } from '../../lib/DelayTimer';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class AdviewOperator extends Operator {

  title: String = "每日廣告 VIEW";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    let reloadTimer: DelayTimer = new DelayTimer(this, () => {
      window.location.reload();
    }, [], 20000);

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

        EmailCacheConfig.lastAdFinishedAt = (new Date).getTime();
        EmailCacheConfig.save([`lastAdFinishedAt`], () => {
          new DelayTimer(this, () => {
            window.close();
          }, [], 5000);
        });

        reloadTimer.cancel();
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
      Logger.debug("Retry later ...");
      window.setTimeout(window.ecAdview, 1000);
    };
    window.ecAdview();
  }

};
