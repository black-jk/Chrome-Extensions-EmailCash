// ====================================================================================================
// [EmailCashDispatcher]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from '../lib/Logger';
import { ECTools } from '../lib/ECTools';
import { EmailCacheConfig } from '../lib/ChromeStorage';
import * as AppActions from '../constants/actions/app';
import { Operator } from './operators/Operator';
import { HomeOperator } from './operators/HomeOperator';
import { LoginOperator } from './operators/LoginOperator';
import { DailySurveyOperator } from './operators/DailySurveyOperator';
import { AdclickOperator } from './operators/AdclickOperator';
import { AdviewOperator } from './operators/AdviewOperator';
import { LattoOperator } from './operators/LattoOperator';
import { DailyGamesOperator } from './operators/DailyGamesOperator';
import { AccountOperator } from './operators/AccountOperator';
import { MailOperator } from './operators/MailOperator';
import { MailDetailOperator } from './operators/MailDetailOperator';
import { MailClickOperator } from './operators/MailClickOperator';
import { SurveyOperator } from './operators/SurveyOperator';

export class EmailCashDispatcher {

  static execute() {
    Logger.debug("[EmailCashDispatcher.execute()] start");

    let location: String = window.location.toString();
    Logger.debug("[EmailCashDispatcher.execute()] location: " + location);

    let operator: Operator = this._getOperator();
    if (operator) {
      AppConfig.operator = operator;
      AppConfig.store.dispatch({ type: AppActions.START, operator: operator });
      operator.run();
    }

    if (!operator) {
      operator = new Operator;
    }

    let { login, $login_link } = ECTools.checkLogin();
    if (!login) {
      Logger.debug("[EmailCashDispatcher.execute()] Not login yet!");
      if ($login_link) {
        $login_link.click();
      }
    } else if (!ECTools.checkFinished(EmailCacheConfig.lastAdClickedAt)) {
      Logger.debug("[EmailCashDispatcher.execute()] ad-click!");
      if (!(operator instanceof AdclickOperator || operator instanceof AdviewOperator)) {
        Logger.log("[EmailCashDispatcher.execute()] go ad-click!");
        operator.go_adclick(AppConfig.redirectDelay);
        return;
      }
    } else if (!ECTools.checkFinished(EmailCacheConfig.lastDailySurveyAt)) {
      Logger.debug("[EmailCashDispatcher.execute()] daily-survey!");
      if (!(operator instanceof DailySurveyOperator)) {
        Logger.log("[EmailCashDispatcher.execute()] go daily-survey!");
        operator.go_dailysurvey(AppConfig.redirectDelay);
        return;
      }
    } else if (!ECTools.checkFinished(EmailCacheConfig.lastDailyGameAt, 10 * 60 * 60 * 1000)) {
      Logger.debug("[EmailCashDispatcher.execute()] daily-games!");
      if (!(operator instanceof DailyGamesOperator)) {
        Logger.log("[EmailCashDispatcher.execute()] go daily-games!");
        operator.go_dailygames(AppConfig.redirectDelay);
        return;
      }
    }

    Logger.debug("[EmailCashDispatcher.execute()] end");
  }

  // --------------------------------------------------

  static _getOperator() {
    let location: String = window.location.toString();
    Logger.debug("[EmailCashDispatcher] location: " + location);

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/?(default\.aspx?)?$/i)) {
      return new HomeOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/?(login\.aspx?)?$/i)) {
      return new LoginOperator;
    }

    // https://www.emailcash.com.tw/Rewards/DailyAdvertising.aspx
    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/DailyAdvertising.aspx?/i)) {
      return new AdclickOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/DailyAdClicks.aspx\?id=/)) {
      return new AdviewOperator;
    }

    // https://www.emailcash.com.tw/Rewards/DailySurvey.aspx
    if (location.match(/^https?:\/\/www\.emailcash\.com\.tw\/Rewards\/DailySurvey\.aspx?/i) ||
      location.match(/^https?:\/\/www\.emailcash\.com\.tw\/Rewards\/DailySurveryQP\.aspx?/i)) {
      return new DailySurveyOperator;
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/dailylatto\.asp/i)) {
      return new LattoOperator();
    }

    // https://www.emailcash.com.tw/Games/DailyGames.aspx
    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Games\/DailyGames.aspx/i)) {
      return new DailyGamesOperator();
    }

    // https://www.emailcash.com.tw/Account/Points.aspx
    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Account\/Points.aspx/i)) {
      return new AccountOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/Mail\.aspx/i)) {
      return new MailOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/MailDetail\.aspx/i)) {
      return new MailDetailOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/MailClicks\.aspx/i)) {
      return new MailClickOperator();
    }

    if (location.match(/^https?:\/\/(www\.)?emailcash\.com\.tw\/Rewards\/Survey\.aspx/i)) {
      return new SurveyOperator();
    }

    Logger.debug("[EmailCashDispatcher] No operator!");
    return null;
  }

};
