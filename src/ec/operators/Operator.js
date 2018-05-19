// ====================================================================================================
// [Operator]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { NotLoginError } from '../../lib/error/NotLoginError';
import * as AppActions from '../../constants/actions/app';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

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

  go_dailylatto(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/dailylatto.asp", sleep);
  }

  // --------------------------------------------------

  go_adclick(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/Rewards/DailyAdvertising.aspx", sleep);
  }

  // --------------------------------------------------

  go_dailysurvey(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/Rewards/DailySurvey.aspx", sleep);
  }

  // --------------------------------------------------

  go_dailygames(sleep: Number) {
    this.goto("https://www.emailcash.com.tw/Games/DailyGames.aspx", sleep);
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
    Logger.debug("[go_next();]");

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
      this.go_dailysurvey(AppConfig.redirectDelay);
      return true;
    }

    // ------------------------------

    // <a href="/4G/Rewards/Mail.aspx" title="查看郵件獎勵">郵件(<span class="pending">1</span>)</a>
    // <a href="/Account/MyAccount.aspx?go=message" title="查看個人訊息">個人訊息(<span class="pending">1</span>)</a>
    // <a href="/Rewards/Survey.aspx" title="查看市調獎勵">問卷(<span class="pending">1</span>)</a>
    let patterns: Array = [
      '查看郵件獎勵',
      '查看個人訊息',
      // '查看市調獎勵',
    ];
    for (let i: Number = 0; i < patterns.length; i++) {
      let title: String = patterns[i];
      let $link = $(`a[title="${title}"]`);
      if ($link.length > 0) {
        let $span = $($link[0]).find('span[class="pending"]');
        if ($span.length > 0 && $span.html() > 0) {
          let url: String = $link.attr("href");
          Logger.debug(`\$link.click(); - ${url}`);
          $link.click();
          this.goto(url, AppConfig.redirectDelay);
          return true;
        }
      }
    }

    // ------------------------------

    let survey_count = $("a[title='查看市調獎勵']").find("span").html();
    if (survey_count > 0) {
      if (!this.checkFinished(EmailCacheConfig.lastSurveyAt)) {
        this.go_survey(AppConfig.redirectDelay);
        return true;
      }
    }

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

  run() {
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



  // ----------------------------------------------------------------------------------------------------

  checkFinished(time: String): Boolean {
    let timeZoneShift: Number = 16 * 60 * 60 * 1000;
    let seconds: Number = (time - timeZoneShift) % 86400000;
    let lastTime = time - seconds + 86400000;

    let now: Date = new Date();
    let nowTime: Number = now.getTime();

    // Logger.debug(`[lastTime] ${(new Date(lastTime)).toString()}`);
    // Logger.debug(`[nowTime] ${(new Date(nowTime)).toString()}`);

    if (nowTime >= lastTime) {
      return false;
    }
    return true;
  };

  // ----------------------------------------------------------------------------------------------------

  // [timezoneShift]
  // 28800000 = 8 * 60 * 60 * 1000

  parseNextActionDatetime(time: Number, timezoneShift: Number = 28800000): String {
    let date: Date = new Date(time + timezoneShift);
    let datetime: String = date.toISOString().replace(/T/, " ").replace(/\.[0-9][0-9][0-9]Z$/, "");
    return datetime;
  }

};
