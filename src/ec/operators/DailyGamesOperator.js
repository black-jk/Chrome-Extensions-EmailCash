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

    /*
      <div id="ContentPlaceHolder1_divAllGuessNoList" class="yellowbox margin_top5">
        <p class="title margin_bottom5">目前選號</p>
        <div>
          <div class="current_choose">試玩 :<span> 011 257 442 708 729 871 931 </span></div>
        </div>
      </div>
    */

    let $currentNumbers = $("#ContentPlaceHolder1_divAllGuessNoList");
    if ($currentNumbers.length > 0) {
      Logger.log("Numbers found! Go next ...");
      EmailCacheConfig.lastDailyGameAt = (new Date).getTime();
      EmailCacheConfig.save([`lastDailyGameAt`], () => {
        this.go_account(AppConfig.redirectDelay);
      });
      return;
    }

    /*
    <div class="number_btn_border">
      <a href="javascript:void(0);" class="number_btn btn_auto AutoNumber">自動選號</a>
      <a href="javascript:void(0);" class="number_btn btn_choose SentFun">確定選號</a>
    </div>
    */
    Logger.log("Click AutoNumber.");
    $(".AutoNumber")[0].click();

    Logger.log("Click SentFun.");
    this.SentFunClick();
  }

  // ----------------------------------------------------------------------------------------------------

  SentFunClick() {
    // copy from https://www.emailcash.com.tw/4G/js/games/DailyGamesJS.js

    var BetNumStr = "|";
    var errmark = 0;
    var n = $(".GuessNoList").length;

    for (var i = 0; i < n; i++) {
      var ThisInput = $("#ContentPlaceHolder1_repeaterGuessInput_txtBetNum_" + i);
      var BetNum = ThisInput.val().trim();
      if (BetNum.length > 0) {
        if (!isNaN(BetNum)) {
          if (BetNum > 0 && BetNum < 1000) {
            ThisInput.removeClass("Markfoucs");
            BetNumStr = BetNumStr + BetNum + "|";
          }
          else {
            ThisInput.addClass("Markfoucs");
            errmark = 2;
          }
        } else {
          ThisInput.addClass("Markfoucs");
          errmark = 1;
        }
      } else {
        ThisInput.addClass("Markfoucs");
        errmark = 1;
      }
    }

    if (errmark === 1) {
      alert("請輸入數字！");
      return false;
    }
    else if (errmark === 2) {
      alert("請輸入數字1~999！");
      return false;
    }

    //設定存入DB的號碼
    $("#ContentPlaceHolder1_hidBetNumStr").val(BetNumStr);
    //取得投注扣除費用
    var _efee = $("#ContentPlaceHolder1_hidFee").val();
    var msg = "";

    //第一次投注免扣e元
    if (_efee == "0") {
      msg = "是否確定送出？\n※送出後數字會由小到大排序。";
    }
    else {
      msg = "送出後將扣除" + _efee + "e，是否確定送出？\n※送出後數字會由小到大排序。";
    }

    if (true || confirm(msg)) {
      //return true;
      var nick = $("#ContentPlaceHolder1_hidNick").val();
      var numStr = $("#ContentPlaceHolder1_hidBetNumStr").val();
      var datastr = "act=0&nick=" + nick + "&numStr=" + numStr;

      $.ajax({
        type: "POST",
        url: "DailyGamesAjax.aspx",
        data: datastr,
        success: function (res) {
          if (res == "1") {
            $("#ContentPlaceHolder1_hidBetNumStr").value = "";
            window.location.reload();
          }
          else {
            alert("發生錯誤，請重新再試。");
          }

        },
        beforeSend: function () {
          //$("#loading").show();
          //$(".loadingimg").show();
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("發生錯誤，請重新再試。");
          //$("#loading").hide();
          //$(".loadingimg").hide();
        }
      });
    }
  }

};
