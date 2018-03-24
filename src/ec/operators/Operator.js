// ====================================================================================================
// [Operator]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { NotLoginError } from '../../lib/error/NotLoginError';
import * as AppActions from '../../constants/actions/app';

export class Operator {

  // ----------------------------------------------------------------------------------------------------

  title: String = "EmailCash Operator";



  // ----------------------------------------------------------------------------------------------------
  // [Method]
  // ----------------------------------------------------------------------------------------------------

  go_home(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/", sleep);
  }

  // --------------------------------------------------

  go_latto(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/dailylatto.asp", sleep);
  }

  // --------------------------------------------------

  go_dailygames(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/Games/DailyGames.aspx", sleep);
  }

  // --------------------------------------------------

  go_adclick(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/Rewards/DailyAdvertising.aspx", sleep);
  }

  // --------------------------------------------------

  go_earn(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/Rewards/DailySurvey.aspx", sleep);
  }

  // --------------------------------------------------

  go_account(sleep: Number) {
    let href: String = $("a[title='查看e元報表']").attr("href");
    this.goto(href, sleep);
  }

  // --------------------------------------------------

  go_mail(sleep: Number) {
    let href: String = $("a[title='查看郵件獎勵']").attr("href");
    this.goto(href, sleep);
  }

  // --------------------------------------------------

  go_survey(sleep: Number) {
    let href: String = $("a[title='查看市調獎勵']").attr("href");
    this.goto(href, sleep);
  }

  // ----------------------------------------------------------------------------------------------------

  go_next(): Boolean {
    let $ad_link = $('a[title="每日廣告"]');
    if ($ad_link.length > 0) {
      Logger.debug("\$ad_link.click();");
      $ad_link.click();

      this.go_adclick(AppConfig.redirectDelay);
      return true;
    }

    let $question_link = $('a[title="每日問答"]');
    if ($question_link.length > 0) {
      Logger.debug("\$question_link.click();");
      $question_link.click();

      this.go_earn(AppConfig.redirectDelay);
      return true;
    }

    //<a href="/4G/Rewards/Mail.aspx" title="查看郵件獎勵">郵件(<span class="pending">1</span>)</a>
    /*
    let $mail_link = $('a[title="查看郵件獎勵"]');
    if ($mail_link.length > 0) {
      Logger.debug("\$mail_link.click();");
      $mail_link.click();

      this.go_mail(AppConfig.redirectDelay);
      return true;
    }
    */

    /*
    let survey_count = $("a[title='查看市調獎勵']").find("span").html();
    if (survey_count > 0) {
      this.go_survey(AppConfig.redirectDelay);
      return true;
    }
    */

    return false;
  }

  // ----------------------------------------------------------------------------------------------------

  goto(url, sleep) {
    if (sleep > 0) {
      Logger.debug("goto '" + url + "'   (sleep: " + sleep + ")");
      window.setTimeout(function () {
        window.location = url;
      }, sleep);
    } else {
      Logger.debug("goto '" + url);
      window.location = url;
    }
  }



  // ----------------------------------------------------------------------------------------------------
  // [Operation]
  // ----------------------------------------------------------------------------------------------------

  delay: Number = 0;

  run() {
    let thisObject: Operator = this;

    if (typeof this.delay == 'number' && this.delay > 0) {
      Logger.debug("delay: " + this.delay);
      let delayId: Number = window.setInterval(function () {
        thisObject.run();
        window.clearInterval(delayId);
      }, this.delay);
      this.delay = 0;
      return;
    } else if (typeof this.delay == 'function') {
      Logger.debug("delay...");
      let delayId: Number = window.setInterval(function () {
        if (!thisObject.delay()) {
          window.clearInterval(delayId);
          thisObject.delay = 0;
          thisObject.run();
        }
      }, 100);
      return;
    }

    try {
      Logger.debug("[start()]");
      this.start();

      Logger.debug("[checkLogin()]");
      this.checkLogin();

      Logger.debug("[operation()]");
      this.operation();

      Logger.debug("[done()]");
      this.done();
    } catch (e) {
      if (e instanceof NotLoginError) {
        return; // do nothing
      }

      console.error(e);
      Logger.error(e.message);
      if (AppConfig.debug) {
        alert(e);
      }
    }
  }

  // --------------------------------------------------

  start() {
    // Logger.debug("START");
  }

  // --------------------------------------------------

  autoLogin: Boolean = true;

  checkLogin() {
    let $login_link = $("a:contains('會員登入')");
    if ($login_link != null && $login_link.length > 0) {
      Logger.log("Loggin link found: '" + $login_link.text().trim() + "'");

      if (this.autoLogin) {
        let href = $login_link.attr("href");
        this.goto(href, AppConfig.redirectDelay);
        Logger.log("Goto '" + href + "'");
      } else {
        Logger.log("Waiting for login!");
      }

      throw new NotLoginError(`[${this.title}] Not login yet!`);
    }
  }

  // --------------------------------------------------

  operation() {
    throw new Error("[" + this.title + "] Override this function first!");
  }

  // --------------------------------------------------

  done() {
    // Logger.debug("DONE");
  }

};
