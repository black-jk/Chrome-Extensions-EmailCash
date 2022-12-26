// ====================================================================================================
// [Question]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { ECTools } from '../../lib/ECTools';

export class DailySurveyOperator extends Operator {

  title: String = "每日問答";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    let $obj = $("*:contains('謝謝您的參與，您已經獲得了今天的獎勵'),*:contains('感謝您的回應，您獲得了')");
    if ($obj.length > 0) {
      Logger.log($obj.text().trim());

      EmailCacheConfig.lastDailySurveyAt = (new Date).getTime();
      EmailCacheConfig.save([`lastDailySurveyAt`], () => {
        // this.go_dailygames(AppConfig.redirectDelay);
        this.go_account(AppConfig.redirectDelay);
      });
      return;
    }

    // ------------------------------

    let $div = $("div[class='content']:contains('填完即可獲得')");
    if ($div.length > 0) {
      // do nothing, waiting for user input
      return;
    }

    // ------------------------------

    let $inputs = $("div[class='dailysurvey_award']").find("a[class='table-row']");
    if ($inputs.length > 0) {
      try {
        $inputs[0].click();
      } catch (e) {
      }
      return;
    }

    // ------------------------------

    if (ECTools.checkFinished(EmailCacheConfig.lastDailySurveyAt)) {
      let now: Number = (new Date).getTime();
      if (now < EmailCacheConfig.lastDailySurveyAt + 1 * 60 * 1000) {
        // this.go_dailygames(AppConfig.redirectDelay);
        this.go_account(AppConfig.redirectDelay);
        return;
      } else {
        EmailCacheConfig.lastDailySurveyAt = (new Date).getTime();
        EmailCacheConfig.save([`lastDailySurveyAt`], () => {
          // this.go_dailygames(AppConfig.redirectDelay);
          this.go_account(AppConfig.redirectDelay);
        });
      }
    }

    // ------------------------------

    $obj = $("*:contains('目前的問題您都回答過了，請按下確認鈕取得本日點數')");
    if ($obj.length > 0) {
      Logger.log($obj.text().trim());
      $inputs = $obj.find("input[type='submit']");
      if ($inputs.length > 0) {
        Logger.log("click submit button");
        $inputs[0].click();
      } else {
        Logger.error("Missing submit button");
      }
      return;
    }

    // ------------------------------

    /*
    <div class="tr">
        <div class="td">1</div>
        <div class="td" style="text-align:left; padding-left:5px;">女性經痛調查</div>
        <div class="td">1</div>
        <div class="td tdColor">3 e元 + 1 金幣</div>
        <div class="td" style="padding-top:5px">
            <input type="image" name="ctl00$mainPlaceHolder$rptQP$ctl00$ibtnQP" id="ctl00_mainPlaceHolder_rptQP_ctl00_ibtnQP" src="../images/rewards/dailySurvey/edit.gif" style="border-width:0px;">
            <input type="hidden" name="ctl00$mainPlaceHolder$rptQP$ctl00$hidSid" id="ctl00_mainPlaceHolder_rptQP_ctl00_hidSid" value="301">
            <input type="hidden" name="ctl00$mainPlaceHolder$rptQP$ctl00$hidIdtCode" id="ctl00_mainPlaceHolder_rptQP_ctl00_hidIdtCode" value="E8AAAAD0-7DDD-45D9-934F-AAE5246267BA">
        </div>
    </div>
    */

    // ------------------------------

    Logger.error("action terminated.");
  }

};
