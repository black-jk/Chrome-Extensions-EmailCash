// ====================================================================================================
// [DailyGames]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { DelayTimer } from '../../lib/DelayTimer';

export class DailyGamesOperator extends Operator {

  title: String = "以小搏大";



  // ----------------------------------------------------------------------------------------------------

  run() {
    if ($("#ReciTime").html().trim() == "") {
      Logger.debug("pause run. (waiting for DailyGamesJS.js ...)");
      new DelayTimer(this, this.run, [], 500);
    } else {
      Logger.debug("#ReciTime: " + $("#ReciTime").html().trim());
      Logger.debug("continue run");
      super.run();
    }
  };

  // ----------------------------------------------------------------------------------------------------

  operation() {
    /// http://www.emailcash.com.tw/4G/js/games/DailyGamesJS.js

    //取得投注扣除費用
    let _efee = $("#ctl00_mainPlaceHolder_hidFee").val();
    Logger.debug("_efee: " + _efee);
    if (_efee > 0) {
      EmailCacheConfig.lastDailyGameAt = (new Date).getTime();
      EmailCacheConfig.save([`lastDailyGameAt`], () => {
        this.go_account(AppConfig.redirectDelay);
      });
      return;
    }

    Logger.log("Click AutoNumber.");
    $(".AutoNumber").click();

    // act:0
    // nick:w214nt8f4f2o
    // numStr:|89|734|590|40|833|298|131|

    // copy from https://www.emailcash.com.tw/4G/js/games/DailyGamesJS.js
    let BetNumStr: String = "|";
    let errmark: Number = 0;
    let n = $(".GuessNoList input").length;

    for (let i: Number = 0; i < n; i++) {
      let BetNum = $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").val().trim();
      if (BetNum.length > 0) {
        if (!isNaN(BetNum)) {
          if (BetNum > 0 && BetNum < 1000) {
            $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").removeClass("Markfoucs");
            BetNumStr = BetNumStr + BetNum + "|";
          } else {
            $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").addClass("Markfoucs");
            errmark = 2;
          }
        } else {
          $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").addClass("Markfoucs");
          errmark = 1;
        }
      } else {
        $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").addClass("Markfoucs");
        errmark = 1;
      }
    }

    //設定存入DB的號碼
    $("#ctl00_mainPlaceHolder_hidBetNumStr").val(BetNumStr);

    let nick = $("#ctl00_mainPlaceHolder_hidNick").val();
    let numStr = $("#ctl00_mainPlaceHolder_hidBetNumStr").val();
    let datastr: String = `act=0&nick=${nick}&numStr=${numStr}`;

    $.ajax({
      type: "POST",
      url: "DailyGamesAjax.aspx",
      data: datastr,
      success: function (res) {
        if (res == "1") {
          $("#ctl00_mainPlaceHolder_hidBetNumStr").value = "";
          window.location.reload();
        } else {
          alert("發生錯誤，請重新再試。");
          $("#loading").hide();
          $(".loadingimg").hide();
        }
      },
      beforeSend: function () {
        $("#loading").show();
        $(".loadingimg").show();
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert("發生錯誤，請重新再試。");
        $("#loading").hide();
        $(".loadingimg").hide();
      }
    });

    // $("td[class=GuessNoList]").find("input").each(function(index, object) { object.value = index; });
  }

};
