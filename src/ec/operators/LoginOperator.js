// ====================================================================================================
// [Login]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class LoginOperator extends Operator {

  title: String = "Login";

  autoLogin: Boolean = false;



  // ----------------------------------------------------------------------------------------------------

  operation = () => {
    this.go_home(AppConfig.redirectDelay);
  }

};
