// ====================================================================================================
// [Survey]
// ====================================================================================================
import { Tool } from '../../lib/Tool';
import { Logger } from '../../lib/Logger';
import { DelayTimer } from '../../lib/DelayTimer';
import { AppConfig } from '../../global';
import { Operator } from './Operator';

export class SurveyOperator extends Operator {

  title: String = "";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    /*
    <tr>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblSuid">381733</span></td>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblLastAttpemt">107-05-16</span></td>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblSuStatus">開啟</span>
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidAnsStat" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidAnsStat" value="01">
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidClevel" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidClevel" value="0">
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidStatus" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidStatus" value="05">
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidPanelStatus" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidPanelStatus" value="05">
      </td>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblPoints"><b>等待 e元</b></span></td>
      <td>
        <span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblSurvey">
          <a href="javascript:startSurvey1('https://www.emailcash.com.tw/Rewards/SurveyDetail.aspx?surveyType=start2&amp;sid=w214nt8f4f2o&amp;codes=qhrmgcys')"><b>開始</b></a>
        </span>
        <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidCodes" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidCodes" value="qhrmgcys">
      </td>
    </tr>
    <tr>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblSuid">382634</span></td>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblLastAttpemt">Never</span></td>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblSuStatus">開啟</span>
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidAnsStat" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidAnsStat" value="01">
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidClevel" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidClevel" value="0">
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidStatus" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidStatus" value="05">
          <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidPanelStatus" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidPanelStatus" value="05">
      </td>
      <td><span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblPoints">0<b>新件</b></span></td>
      <td>
        <span id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_lblSurvey">
          <a href="javascript:startSurvey1('https://www.emailcash.com.tw/Rewards/SurveyDetail.aspx?surveyType=start2&amp;sid=ppvivian&amp;codes=vqptvimu')"><b>開始</b></a>
        </span>
        <input type="hidden" name="ctl00$mainPlaceHolder$repeaterPanelSurvey$ctl00$hidCodes" id="ctl00_mainPlaceHolder_repeaterPanelSurvey_ctl00_hidCodes" value="vqptvimu">
      </td>
    </tr>
    */

    let $links = $("a:contains('開始')");
    if ($links.length > 0) {
      new DelayTimer(null, Tool.scrollTo, [$links, -300], 500);
      return;
    }

    // ------------------------------

    let survey_count = $("a[title='查看市調獎勵']").find("span").html();
    if (survey_count == 0) {
      this.go_account(AppConfig.redirectDelay);
      return;
    }

    // ------------------------------

    new DelayTimer(null, Tool.scrollTo, [$("span:contains('我的問卷箱')"), -100], 500);
  }

};
