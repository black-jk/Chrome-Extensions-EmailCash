// ====================================================================================================
// [Mail]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class MailDetailOperator extends Operator {

  title: String = "郵件獎勵: Detail";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    /*
    <td valign="top" bgcolor="#fe7921" align="center" style="padding:20px 40px;font-family:Arial, 'LiHei Pro', '微軟正黑體', '新細明體', sans-serif;font-size:20px;border:2px solid #f76c10;" class="btn-word">
      <a href="https://www.emailcash.com.tw/Rewards/MailClicks.aspx?uid=w214nt8f4f2o&amp;aid={87B7AE04-69CF-4D92-8F0D-DCB3C0DDB828}" style="color:#ffffff;text-decoration:none;font-weight:normal;">按這裡獲得10e元</a>
    </td>
    */

    let $links = $(`a:contains('按這裡獲得10e元')`);
    if ($links.length > 0) {
      Logger.log($links.text().trim());

      let href: String = $links.attr("href");
      Logger.log(href);

      this.goto(href, AppConfig.redirectDelay);
      return;
    }

    // ------------------------------

    // [empty] try just close

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
  }

};
