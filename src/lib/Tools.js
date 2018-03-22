// ====================================================================================================
// [Tools]
// ====================================================================================================
import { AppConfig } from '../global';
import { Logger } from './Logger';
import { DelayTimer } from './DelayTimer';

export class Tools {

  static loadJQuery(callback) {
    var script = document.createElement("script");
    //script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    //script.setAttribute("src", "https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js");
    script.setAttribute("src", "https://www.emailcash.com.tw/lib/jquery.min_1.6.1.js");
    //script.setAttribute("src", "https://code.jquery.com/jquery-1.9.1.js");

    script.addEventListener("load", function () {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);

    document.body.appendChild(script);
  }



  // ----------------------------------------------------------------------------------------------------

  static redirect(time, url = "") {
    Logger.log("[Tools.redirect()] Set redirect after " + Math.floor(time / 1000) + " seconds!");
    if (!url) url = window.location;

    return new DelayTimer(this, (url) => {
      Logger.log("[Tools.redirect()] Do redirect! url = '" + url + "'");
      window.location = url;
    }, [url], time);
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
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  if (!AppConfig.debug) {
    document.body.removeChild(script); // clean up
  }
  //});
  /**/
};
