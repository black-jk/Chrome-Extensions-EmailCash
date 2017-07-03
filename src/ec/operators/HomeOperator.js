// ====================================================================================================
// [Home]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class HomeOperator extends Operator {

  title = "EmailCash Home";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    let inOperation = this.go_next();
    if (inOperation) {
      return;
    }

    //this.go_latto(AppConfig.redirectDelay);
    //this.go_adclick(AppConfig.redirectDelay);
    this.go_dailygames(AppConfig.redirectDelay);
    //this.go_account(AppConfig.redirectDelay);
  }

};