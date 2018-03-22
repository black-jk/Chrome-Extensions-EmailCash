// ====================================================================================================
// [Latto]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class LattoOperator extends Operator {

  title = "每日樂透";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    return;

    /*
    let $b = $("font[size='3'] b:contains('您還沒參與本期每日樂透')");
    if ($b != null && $b.length > 0) {
      Logger.log("Button found: '" + $b.text().trim() + "'");
      
      Logger.log("call: barclick();");
      exec(function() {
        barclick();
      });
      
      Logger.log("call: stopBar();");
      exec(function() {
        stopBar();
      });
      
      Logger.log("call: checknumber();");
      exec(function() {
        checknumber();
      });
      
      Logger.log("call: lattoSentfun();");
      exec(function() {
        lattoSentfun();
      });
    } else {
      Logger.debug("Already Sent!");
      this.go_adclick(AppConfig.redirectDelay);
    }
    */
  }

};
