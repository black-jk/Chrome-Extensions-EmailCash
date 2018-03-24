// ====================================================================================================
// [Dispatcher]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from '../lib/Logger';
import * as AppActions from '../constants/actions/app';
import { Operator } from './operators/Operator';
import { HomeOperator } from './operators/HomeOperator';
import { LoginOperator } from './operators/LoginOperator';
import { QuestionOperator } from './operators/QuestionOperator';
import { AdclickOperator } from './operators/AdclickOperator';
import { AdviewOperator } from './operators/AdviewOperator';
import { LattoOperator } from './operators/LattoOperator';
import { DailyGamesOperator } from './operators/DailyGamesOperator';
import { AccountOperator } from './operators/AccountOperator';
import { MailOperator } from './operators/MailOperator';
import { SurveyOperator } from './operators/SurveyOperator';

export class Dispatcher {

  static execute() {
    Logger.debug("[Dispatcher.execute()] start");

    let location: String = window.location.toString();
    Logger.debug("[Dispatcher.execute()] location: " + location);

    let operator: Operator = this._getOperator();
    if (operator != null) {
      AppConfig.operator = operator;
      AppConfig.store.dispatch({ type: AppActions.START, operator: operator });
      operator.run();
    }

    Logger.debug("[Dispatcher.execute()] end");
  }

  // --------------------------------------------------

  static _getOperator() {
    let location: String = window.location.toString();
    Logger.debug("[Dispatcher] location: " + location);

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/?(default\.aspx?)?$/i)) {
      return new HomeOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/?(login\.aspx?)?$/i)) {
      return new LoginOperator;
    }

    if (location.match(/^https?:\/\/www\.emailcash\.com\.tw\/Rewards\/DailySurvey\.aspx?/i)) {
      return new QuestionOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/DailyAdvertising.aspx?/i)) {
      return new AdclickOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/DailyAdClicks.aspx\?id=/)) {
      return new AdviewOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/dailylatto\.asp/i)) {
      return new LattoOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Games\/DailyGames.aspx/i)) {
      return new DailyGamesOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/account\.asp/i) ||
      location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Account\/MyAccount.aspx\?go=points?/i)
    ) {
      return new AccountOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/Mail\.aspx/i)) {
      return new MailOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/Survey\.aspx/i)) {
      return new SurveyOperator();
    }

    Logger.debug("[Dispatcher] No operator!");
    return null;
  }

};
