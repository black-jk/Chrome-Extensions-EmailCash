// ====================================================================================================
// [Dispatcher]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from '../lib/Logger';
import * as AppActions from '../constants/actions/app';

import { HomeOperator } from './operators/HomeOperator';
import { LoginOperator } from './operators/LoginOperator';
import { QuestionOperator } from './operators/QuestionOperator';
import { AdclickOperator } from './operators/AdclickOperator';
import { AdviewOperator } from './operators/AdviewOperator';
import { LattoOperator } from './operators/LattoOperator';
import { DailyGamesOperator } from './operators/DailyGamesOperator';
import { AccountOperator } from './operators/AccountOperator';
import { SurveyOperator } from './operators/SurveyOperator';

export class Dispatcher {

  static execute() {
    Logger.debug("[Dispatcher.execute()] start");

    let location = window.location.toString();
    Logger.debug("[Dispatcher.execute()] location: " + location);

    let operator = this._getOperator();
    if (operator != null) {
      AppConfig.title = operator.title; // [TODO] move to class
      AppConfig.store.dispatch({ type: AppActions.START, operator: operator });
      operator.run();
    }

    Logger.debug("[Dispatcher.execute()] end");
  }

  // --------------------------------------------------

  static _getOperator() {
    let location = window.location.toString();
    Logger.debug("[Dispatcher] location: " + location);

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/?(default\.aspx?)?$/i)) {
      return new HomeOperator;
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/?(login\.aspx?)?$/i)) {
      return new LoginOperator;
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/earn.asp\?go=qsurvey/) ||
      location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Rewards\/DailySurvey.aspx?/i)
    ) {
      return new QuestionOperator;
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Rewards\/DailyAdvertising.aspx?/i)) {
      return new AdclickOperator;
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Rewards\/DailyAdClicks.aspx\?id=/)) {
      return new AdviewOperator;
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/dailylatto\.asp/i)) {
      return new LattoOperator();
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Games\/DailyGames.aspx/i)) {
      return new DailyGamesOperator();
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/account\.asp/i) ||
      location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Account\/MyAccount.aspx\?go=points?/i)
    ) {
      return new AccountOperator();
    }

    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Rewards\/Survey\.aspx/i)) {
      return new SurveyOperator();
    }

    return null;
  }

};