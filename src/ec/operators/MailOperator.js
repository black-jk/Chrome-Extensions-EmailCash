// ====================================================================================================
// [Mail]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

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

    let $links = $("div[class='td']:contains('未閱讀')").parent().find("a");
    if ($links.length > 0) {
      Logger.log($links.text().trim());

      let href = $links.attr("href");
      Logger.log(href);
      return;
    }

    this.go_account(AppConfig.redirectDelay);
  }

};
