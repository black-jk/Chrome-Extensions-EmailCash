// ====================================================================================================
// [Survey]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { DelayTimer } from '../../lib/DelayTimer';

export class SurveyOperator extends Operator {

  title: String = "";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    let body: HTMLElement = (document.compatMode == "BackCompat") ?
      document.body :
      document.documentElement;

    // <a href="javascript:startSurvey1('https://www.emailcash.com.tw/Rewards/SurveyDetail.aspx?surveyType=start2&amp;sid=w214nt8f4f2o&amp;codes=izqfjxoe')"><b>開始</b></a>
    let $links = $("a:contains('開始')");
    if ($links.length > 0) {
      new DelayTimer(this, () => {
        Logger.log('scroll to end');
        let scrollTop: Number = Math.max(0, $links.offset().top - 300);
        body.scrollTop = scrollTop;
        Logger.log(`scrollTop = ${scrollTop}`);
      }, [], 500);
      return;
    }

    // ------------------------------

    let survey_count = $("a[title='查看市調獎勵']").find("span").html();
    if (survey_count == 0) {
      this.go_account(AppConfig.redirectDelay);
      return;
    }

    // ------------------------------

    new DelayTimer(this, () => {
      Logger.log('scroll to end');
      let scrollTop: Number = Math.max(0, $("span:contains('我的問卷箱')").offset().top - 100);
      body.scrollTop = scrollTop;
      Logger.log(`scrollTop = ${scrollTop}`);
    }, [], 500);
  }

};
