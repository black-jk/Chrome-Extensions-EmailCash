// ====================================================================================================
// [Account]
// ====================================================================================================
import { Tool } from '../../lib/Tool';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class AccountOperator extends Operator {

  title: String = "e元報表";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    /*
      <td colspan="5" class="text-left">
        <a href="Points.aspx?st=last"><b>&lt;&lt;</b> 上月明細</a>
      </td>
    */

    $(`table[class="tbList"]`).width(350);

    Logger.log('scroll to end');
    Tool.scrollTo($("td a:contains('上月明細')"), -100);

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
