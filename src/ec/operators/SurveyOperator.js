// ====================================================================================================
// [Survey]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class SurveyOperator extends Operator {

  title: String = "";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    let survey_count = $("a[title='查看市調獎勵']").find("span").html();
    if (survey_count > 0) {
      return;
    }

    this.go_account(AppConfig.redirectDelay);
  }

};
