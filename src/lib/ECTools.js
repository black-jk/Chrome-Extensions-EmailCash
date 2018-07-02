// ====================================================================================================
// [ECTools]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from './Logger';
import { DelayTimer } from './DelayTimer';

export class ECTools {

  static loadJQuery(callback) {
    let script = document.createElement("script");
    //script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    //script.setAttribute("src", "https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js");
    script.setAttribute("src", "https://www.emailcash.com.tw/lib/jquery.min_1.6.1.js");
    //script.setAttribute("src", "https://code.jquery.com/jquery-1.9.1.js");

    script.addEventListener("load", function () {
      let script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);

    document.body.appendChild(script);
  }



  // ----------------------------------------------------------------------------------------------------

  static redirect(time: Number, url: String = ""): DelayTimer {
    Logger.log("[ECTools.redirect()] Set redirect after " + Math.floor(time / 1000) + " seconds!");
    if (!url) url = window.location;

    return new DelayTimer(this, (url: String) => {
      Logger.log("[ECTools.redirect()] Do redirect! url = '" + url + "'");
      window.location = url;
    }, [url], time);
  }



  // ----------------------------------------------------------------------------------------------------

  static checkLogin(): Boolean {
    let href: String = "";
    let login: Boolean = true;
    let $login_link = $("a:contains('會員登入')");
    if ($login_link != null && $login_link.length > 0) {
      Logger.log("Loggin link found: '" + $login_link.text().trim() + "'");
      login = false;
      href = $login_link.attr("href");
    }
    return {
      login,
      href
    };
  }

  // ----------------------------------------------------------------------------------------------------

  static checkFinished(time: Number, shift: Number = 0): Boolean {
    let timeZoneShift: Number = 16 * 60 * 60 * 1000;
    let seconds: Number = (time - timeZoneShift - shift) % 86400000;
    let lastTime = time - seconds + 86400000;

    let now: Date = new Date();
    let nowTime: Number = now.getTime();

    // Logger.debug(`[lastTime] ${(new Date(lastTime)).toString()}`);
    // Logger.debug(`[nowTime] ${(new Date(nowTime)).toString()}`);

    Logger.debug(`[nowTime >= lastTime] ${(nowTime - lastTime) / 1000 / 60 / 60} HR`)
    if (nowTime >= lastTime) {
      return false;
    }
    return true;
  };

  // ----------------------------------------------------------------------------------------------------

  // [timezoneShift]
  // 28800000 = 8 * 60 * 60 * 1000

  static parseNextActionDatetime(time: Number, timezoneShift: Number = 28800000): String {
    let date: Date = new Date(time + timezoneShift);
    let datetime: String = date.toISOString().replace(/T/, " ").replace(/\.[0-9][0-9][0-9]Z$/, "");
    return datetime;
  }

};



// ====================================================================================================
// [exec]
// ====================================================================================================

export const exec = (fn) => {
  /*/
  fn();
  /*/
  //$(document).ready(function() {
  let script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  if (!AppConfig.debug) {
    document.body.removeChild(script); // clean up
  }
  //});
  /**/
};
