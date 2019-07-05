// ====================================================================================================
// [Survey]
// ====================================================================================================
import { Tool } from '../../lib/Tool';
import { Logger } from '../../lib/Logger';
import { DelayTimer } from '../../lib/DelayTimer';
import { AppConfig } from '../../global';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class SurveyOperator extends Operator {

  title: String = "問卷";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    /*
    <div class="survey_award">
      <div class="table-row dis head">
        <div class="table-cell">問卷ID</div>
        <div class="table-cell">前次回應時間</div>
        <div class="table-cell">問卷狀況</div>
        <div class="table-cell">e元狀況</div>
        <div class="table-cell">問卷連結</div>
      </div>
      
      <a class="table-row" href="javascript:startSurvey('/Rewards/SurveyDetail.aspx?surveyType=start&amp;sid=529722&amp;codes=khcfeihr')">
        <div class="table-cell"><span class="dis-2">ID:</span>24156</div>
        <div class="table-cell dis">Never</div>
        <div class="table-cell">開啟</div>
        <div class="table-cell red"><span class="dis-2">獎勵:</span>新件</div>
        <div class="table-cell dis">連結  <span class="glyphicon glyphicon-link"></span></div>
      </a>
      
      <a class="table-row" href="javascript:void(0)">
        <div class="table-cell"><span class="dis-2">ID:</span>24022</div>
        <div class="table-cell dis">108-04-02</div>
        <div class="table-cell">已結束</div>
        <div class="table-cell red"><span class="dis-2">獎勵:</span>30e元 入帳</div>
        <div class="table-cell dis">已完成  <span class="glyphicon glyphicon-ok-circle"></span></div>
      </a>
    </div>
    */

    new DelayTimer(null, Tool.scrollTo, [$("p:contains('問卷清單')"), -200], 200);

    // let $links = $("div[class='survey_award'] a div:contains('新件')");
    let $links = $("div[class='survey_award'] a div:contains('Never')");
    if ($links.length > 0) {
      Logger.log('New survy found!')
      new DelayTimer(null, Tool.scrollTo, [$links, -300], 500);
      return;
    }

    // ------------------------------

    EmailCacheConfig.lastSurveyAt = (new Date).getTime();
    EmailCacheConfig.save([`lastSurveyAt`], () => {
      this.go_account(AppConfig.redirectDelay ? AppConfig.redirectDelay : 5000);
    });
  }

};
