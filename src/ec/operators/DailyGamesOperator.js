// ====================================================================================================
// [DailyGames]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';

export class DailyGamesOperator extends Operator {

    title = "以小搏大";



    // ----------------------------------------------------------------------------------------------------

    delay() {
        if ($("#ReciTime").html().trim() != "") {
            Logger.debug("#ReciTime: " + $("#ReciTime").html().trim());
            Logger.debug("continue run");
            return false;
        }
        Logger.debug("pause run. (waiting for DailyGamesJS.js ...)");
        return true;
    };

    // ----------------------------------------------------------------------------------------------------

    operation() {
        /// http://www.emailcash.com.tw/4G/js/games/DailyGamesJS.js

        //取得投注扣除費用
        var _efee = $("#ctl00_mainPlaceHolder_hidFee").val();
        Logger.debug("_efee: " + _efee);
        if (_efee > 0) {
            this.go_account(AppConfig.redirectDelay);
            return;
        }

        Logger.log("Click AutoNumber.");
        $(".AutoNumber").click();

        /*/
        Logger.log("Click SentFun.");
        $(".SentFun").click();
        /*/

        // act:0
        // nick:w214nt8f4f2o
        // numStr:|89|734|590|40|833|298|131|

        // copy from http://www.emailcash.com.tw/4G/js/games/DailyGamesJS.js
        var BetNumStr = "|";
        var errmark = 0;
        var n = $(".GuessNoList input").length;

        for (var i = 0; i < n; i++) {
            var BetNum = $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").val().trim();
            if (BetNum.length > 0) {
                if (!isNaN(BetNum)) {
                    if (BetNum > 0 && BetNum < 1000) {
                        $("#ctl00_mainPlaceHolder_repeaterGuessInput_ctl0" + i + "_txtBetNum").removeClass("Markfoucs");
                        BetNumStr = BetNumStr + BetNum + "|";
                    }
                    else {
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

        var nick = $("#ctl00_mainPlaceHolder_hidNick").val();
        var numStr = $("#ctl00_mainPlaceHolder_hidBetNumStr").val();
        var datastr = "act=0&nick=" + nick + "&numStr=" + numStr;

        $.ajax({
            type: "POST",
            url: "DailyGamesAjax.aspx",
            data: datastr,
            success: function (res) {
                if (res == "1") {

                    $("#ctl00_mainPlaceHolder_hidBetNumStr").value = "";
                    window.location.reload();
                }
                else {
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
        /**/

        // $("td[class=GuessNoList]").find("input").each(function(index, object) { object.value = index; });
    }

};
