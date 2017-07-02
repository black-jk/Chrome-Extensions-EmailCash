// ====================================================================================================
// [Account]
// ====================================================================================================
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class AccountOperator extends Operator {

  title = "e元報表";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    ///<a href="account.asp?go=points&amp;u=w214nt8f4f2o&amp;c=B0EE1F5580D0F7A&amp;st=last"><b>&lt;&lt;</b> 上月明細</a>

    Logger.debug('scroll to end');
    var scrollTop = Math.max(0, $("td a:contains('上月明細')").offset().top - 100);
    $("body").scrollTop(scrollTop);

    /*
    // ok
    $('html, body').animate({
      scrollTop: $("td a:contains('上月明細')").offset().top - 100
    }, 1000);
    */

    // check again if not all complete
    this.go_next();
  }

};
