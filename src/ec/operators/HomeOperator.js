// ====================================================================================================
// [Home]
// ====================================================================================================
import { Config } from '../../global';
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

    //this.go_latto(Config.redirectDelay);
    //this.go_adclick(Config.redirectDelay);
    this.go_dailygames(Config.redirectDelay);
    //this.go_account(Config.redirectDelay);
  }

};
