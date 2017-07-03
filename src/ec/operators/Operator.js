// ====================================================================================================
// [Operator]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { NotLoginError } from '../../lib/error/NotLoginError';
import * as AppActions from '../../constants/actions/app';

export class Operator {

  // ----------------------------------------------------------------------------------------------------

  title = "EmailCash Operator";



  // ----------------------------------------------------------------------------------------------------
  // [Method]
  // ----------------------------------------------------------------------------------------------------

  go_home(sleep) {
    this.goto("http://www.emailcash.com.tw/", sleep);
  }

  // --------------------------------------------------

  go_latto(sleep) {
    this.goto("http://www.emailcash.com.tw/dailylatto.asp", sleep);
  }

  // --------------------------------------------------

  go_dailygames(sleep) {
    this.goto("http://www.emailcash.com.tw/4G/Games/DailyGames.aspx", sleep);
  }

  // --------------------------------------------------

  go_adclick(sleep) {
    this.goto("http://www.emailcash.com.tw/4G/Rewards/DailyAdvertising.aspx", sleep);
  }

  // --------------------------------------------------

  go_earn(sleep) {
    this.goto("http://www.emailcash.com.tw/earn.asp?go=qsurvey", sleep);
  }

  // --------------------------------------------------

  go_account(sleep) {
    var href = $("a[title='查看e元報表']").attr("href");
    this.goto(href, sleep);
  }

  // --------------------------------------------------

  go_mail(sleep) {
    var href = $("a[title='查看郵件獎勵']").attr("href");
    this.goto(href, sleep);
  }

  // --------------------------------------------------

  go_survey(sleep) {
    var href = $("a[title='查看市調獎勵']").attr("href");
    this.goto(href, sleep);
  }

  // ----------------------------------------------------------------------------------------------------

  go_next() {
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

  delay = 0;

  run() {
    if (typeof this.delay == 'number' && this.delay > 0) {
      Logger.debug("delay: " + this.delay);
      var thisObject = this;
      var delayId = window.setInterval(function () {
        thisObject.run();
        window.clearInterval(delayId);
      }, this.delay);
      this.delay = 0;
      return;
    } else
    if (typeof this.delay == 'function') {
      Logger.debug("delay...");
      var thisObject = this;
      var delayId = window.setInterval(function () {
        if (!thisObject.delay()) {
          window.clearInterval(delayId);
          thisObject.delay = 0;
          thisObject.run();
        }
      }, 100);
      return;
    }

    try {
      AppConfig.store.dispatch({ type: AppActions.ACTION, actionTitle: "start()" });
      this.start();

      AppConfig.store.dispatch({ type: AppActions.ACTION, actionTitle: "checkLogin()" });
      this.checkLogin();

      AppConfig.store.dispatch({ type: AppActions.ACTION, actionTitle: "operation()" });
      this.operation();

      AppConfig.store.dispatch({ type: AppActions.ACTION, actionTitle: "done()" });
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
    Logger.debug("START");
  }

  // --------------------------------------------------

  autoLogin = true;

  checkLogin() {
    let $login_link = $("a:contains('會員登入')");
    if ($login_link != null && $login_link.length > 0) {
      Logger.log("Loggin link found: '" + $login_link.text().trim() + "'");

      if (this.autoLogin) {
        var href = $login_link.attr("href");
        this.goto(href, AppConfig.redirectDelay);
        Logger.log("Goto '" + href + "'");
      } else {
        Logger.log("Waiting for login!");
      }

      throw new NotLoginError("[" + this.title + "] Not login yet!");
    }
  }

  // --------------------------------------------------

  operation() {
    throw new Error("[" + this.title + "] Override this function first!");
  }

  // --------------------------------------------------

  done() {
    Logger.debug("DONE");
  }

  // ----------------------------------------------------------------------------------------------------

};
