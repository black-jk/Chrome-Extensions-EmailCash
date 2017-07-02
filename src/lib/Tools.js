// ====================================================================================================
// [Tools]
// ====================================================================================================
import { Logger } from './Logger';

export class Tools {

  static loadJQuery(callback) {
    var script = document.createElement("script");
    //script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    //script.setAttribute("src", "http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js");
    script.setAttribute("src", "http://www.emailcash.com.tw/lib/jquery.min_1.6.1.js");
    //script.setAttribute("src", "http://code.jquery.com/jquery-1.9.1.js");

    script.addEventListener("load", function () {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);

    document.body.appendChild(script);
  }



  // ----------------------------------------------------------------------------------------------------

  static refresh(time, label = "refresh") {
    Logger.debug("[Tools.refresh()] [" + label + "] set refresh after " + Math.floor(time / 1000) + " seconds!");

    return setTimeout(function() {
      Logger.debug("[Tools.refresh()] [" + label + "] do refresh!");
      window.location = window.location;
    }, time);
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
    if (!Config.debug) {
      document.body.removeChild(script); // clean up
    }
  //});
  /**/
};
