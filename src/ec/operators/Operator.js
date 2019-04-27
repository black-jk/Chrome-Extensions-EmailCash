// ====================================================================================================
// [Operator]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { DelayTimer } from '../../lib/DelayTimer';
import { ECTools } from '../../lib/ECTools';
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
    this.goto("https://www.emailcash.com.tw/Account/Points.aspx", sleep);
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

    /*
    <ul class="RemindWrap">
      <li><a href="/Account/MyAccount.aspx?go=message">個人訊息<span>(0)</span></a></li>
      <li><a href="/Account/MyAccount.aspx?go=message">公告訊息<span>(0)</span></a></li>
      <li><a href="/Rewards/Survey.aspx">獎勵問卷<span>(1)</span><b class="nfc-show"></b></a></li>
      <li><a href="/Rewards/Mail.aspx">許可郵件<span>(0)</span></a></li>
      <li><a href="/Rewards/DailySurvey.aspx">每日問答</a></li>
      <li><a href="/Rewards/DailyAdvertising.aspx">每日廣告</a></li>
    </ul>
    */
    let keys: Array = [
      '個人訊息',
      '公告訊息',
      '獎勵問卷',
      '許可郵件',
      '每日問答',
      '每日廣告',
    ];
    for (let i: Number = 0; i < keys.length; i++) {
      let key: String = keys[i];
      let pattern: String = `ul[class='RemindWrap'] a:contains('${key}')`;
      let $links = $(pattern);
      if ($links.length > 0) {
        let match = $links.text().match(/\(([0-9]+)\)/);
        if (match) {
          let number = parseInt(match[1]);
          Logger.debug(`[${key}] number: ${number}     match: ${match[1]}`);

          if (number > 0) {
            // $links[0].click();
            let url: String = $links.attr("href");
            this.goto(url, AppConfig.redirectDelay);
            return true;
          }
        }
      }
    }

    return false;
  }

  // ----------------------------------------------------------------------------------------------------

  goto(url, sleep) {
    Logger.log(`[goto] '${url}'`);

    if (EmailCacheConfig.pause) {
      Logger.warn("[PAUSED]");
      return;
    }

    if (sleep > 0) {
      Logger.log(`[goto] sleep: ${sleep / 1000} seconds`);
      new DelayTimer(this, () => {
        window.location = url;
      }, [], sleep);
    } else {
      window.location = url;
    }
  }



  // ----------------------------------------------------------------------------------------------------
  // [Operation]
  // ----------------------------------------------------------------------------------------------------

  run() {
    try {
      if (EmailCacheConfig.pause) {
        Logger.warn("[PAUSED]");
        return;
      }

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
    let { login, $login_link } = ECTools.checkLogin();
    if (!login) {
      if (this.autoLogin && $login_link) {
        $login_link.click();
        Logger.info("$login_link.click();");
      } else {
        Logger.info("Waiting for login!");
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
