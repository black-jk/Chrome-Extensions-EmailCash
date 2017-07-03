// ====================================================================================================
// [Login]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class LoginOperator extends Operator {

  title = "Login";

  autoLogin = false;



  // ----------------------------------------------------------------------------------------------------

  operation = function () {
    this.go_home(AppConfig.redirectDelay);
  }

};
