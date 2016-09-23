  // ====================================================================================================
  // [Classes]
  // ====================================================================================================
  
  // [Operator]
  
  function Operator() {
    
    // ----------------------------------------------------------------------------------------------------
    
    this.title = "EmailCash Operator";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.go_home = function(sleep) {
      this.goto("http://www.emailcash.com.tw/", sleep);
    };
    
    // ----------------------------------------------------------------------------------------------------
    
    this.go_latto = function(sleep) {
      this.goto("http://www.emailcash.com.tw/dailylatto.asp", sleep);
    };
    
    // --------------------------------------------------
    
    this.go_adclick = function(sleep) {
      this.goto("http://www.emailcash.com.tw/4G/Rewards/DailyAdvertising.aspx", sleep);
    };
    
    // --------------------------------------------------
    
    this.go_earn = function(sleep) {
      this.goto("http://www.emailcash.com.tw/earn.asp?go=qsurvey", sleep);
    };
    
    // --------------------------------------------------
    
    this.go_account = function(sleep) {
      var href = $("a[title='查看e元報表']").attr("href");
      this.goto(href, sleep);
    };
    
    // ----------------------------------------------------------------------------------------------------
    
    this.go_next = function() {
      $ad_link = $('a[title="每日廣告"]');
      if ($ad_link.length > 0) {
        Logger.debug("\$ad_link.click();");
        $ad_link.click();
        
        this.go_adclick(Config.redirectDelay);
        return true;
      }
      
      $question_link = $('a[title="每日問答"]');
      if ($question_link.length > 0) {
        Logger.debug("\$question_link.click();");
        $question_link.click();
        
        this.go_earn(Config.redirectDelay);
        return true;
      }
      
      return false;
    };
    
    // ----------------------------------------------------------------------------------------------------
    
    this.goto = function(url, sleep) {
      if (sleep > 0) {
        Logger.debug("goto '" + url + "'   (sleep: " + sleep + ")");
        window.setTimeout(function() {
          window.location = url;
        }, sleep);
      } else {
        Logger.debug("goto '" + url);
        window.location = url;
      }
    };
    
    
    
    // ----------------------------------------------------------------------------------------------------
    
    this.run = function() {
      this.start();
      
      // check login
      if (!this.checkLogin()) {
        return;
      }
      
      this.operation();
      this.done();
    };
    
    // --------------------------------------------------
    
    this.start = function() {
      Logger.debug("START");
    };
    
    // --------------------------------------------------
    
    this.autoLogin = true;
    
    this.checkLogin = function() {
      $login_link = $("a:contains('會員登入')");
      if ($login_link != null && $login_link.length > 0) {
        Logger.log("Loggin link found: '" + $login_link.text().trim() + "'");
        
        if (this.autoLogin) {
          var href = $login_link.attr("href");
          this.goto(href, Config.redirectDelay);
          Logger.log("Goto '" + href + "'");
        } else {
          Logger.log("Waiting for login!");
        }
        return false;
      }
      return true;
    };
    
    // --------------------------------------------------
    
    this.operation = function() {
      throw new Error("[" + this.title + "] Override this function first!");
    };
    
    // --------------------------------------------------
    
    this.done = function() {
      Logger.debug("DONE");
    };
    
  }
  
  
  
  // ====================================================================================================
  // [Home]
  // ====================================================================================================
  
  function HomeOperator() {
    
    this.title = "EmailCash";
    
    // ----------------------------------------------------------------------------------------------------
    this.operation = function() {
      this.go_next();
      
      //this.go_latto(Config.redirectDelay);
      //this.go_adclick(Config.redirectDelay);
    };
    
  }
  
  HomeOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
  // [Login]
  // ====================================================================================================
  
  function LoginOperator() {
    
    this.title = "Login";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.operation = function() {
      this.go_home(Config.redirectDelay);
    };
    
  }
  
  LoginOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
  // [Latto]
  // ====================================================================================================
  
  function LattoOperator() {
    
    this.title = "每日樂透";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.operation = function() {
      return;
      
      $b = $("font[size='3'] b:contains('您還沒參與本期每日樂透')");
      if ($b != null && $b.length > 0) {
        Logger.log("Button found: '" + $b.text().trim() + "'");
        
        Logger.log("call: barclick();");
        exec(function() {
          barclick();
        });
        
        Logger.log("call: stopBar();");
        exec(function() {
          stopBar();
        });
        
        Logger.log("call: checknumber();");
        exec(function() {
          checknumber();
        });
        
        Logger.log("call: lattoSentfun();");
        exec(function() {
          lattoSentfun();
        });
      } else {
        Logger.debug("Already Sent!");
        this.go_adclick(Config.redirectDelay);
      }
    };
    
  }
  
  LattoOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
  // [Adclick]
  // ====================================================================================================
  
  function AdclickOperator() {
    
    this.title = "每日廣告";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.operation = function() {
      /// <a href="view_adc.asp?id=1711&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="UDN買東西">UDN買東西</a>
      /// <a href="view_adc.asp?id=1895&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="IKEA 櫥櫃收納">IKEA 櫥櫃收納</a>
      
      var thisObject = this;
      
      var $href = (function() {
        patterns = [
          "UDN買東西",
          "IKEA 櫥櫃收納",
          "momo購物超划算"
        ];
        
        for (var i in patterns) {
          var pattern = patterns[i];
          $href = $("a[title='"+pattern+"'][target='_blank']:contains('"+pattern+"')").attr("href");
          if ($href != "undefined" && $href != undefined && $href.length > 0) {
            return $href;
          }
          Logger.debug("Missing url of '"+pattern+"'.");
        }
        
        return undefined;
      })();
      
      if (!$href) {
        Logger.debug("Ad link not found! Retry ...");
        this.go_adclick(Config.redirectDelay);
        return;
      }
      
      // ------------------------------
      
      var adWindow;
      
      // callback function for ad-view
      window.onAdClosed = function() {
        console.log('[onAdClosed] callback');
        adWindow.close();
        thisObject.go_earn(1000);
      };
      
      /// open ad-view url
      var openAdWindow = function() {
        if (adWindow != null) {
          if (adWindow.adFinished) {
            Logger.debug("Ad finished, continue to next step.");
            window.onAdClosed();
            return;
          } else {
            Logger.debug("Retry ad-view");
            adWindow.close();
          }
        }
        
        Logger.log("open url: '" + $href + "'  (waiting for callback)");
        adWindow = window.open($href, "", "width:100, height:100");
        adWindow.adFinished = false;
        Logger.debug("Waiting for callback ...");
      };
      openAdWindow();
      
      /// set timeout for retry
      window.setInterval(function() {
        Logger.debug("Timeup. Call openAdWindow() again.");
        openAdWindow();
      }, 60000);
    };
    
  }
  
  AdclickOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
  // [Adview]
  // ====================================================================================================
  
  function AdviewOperator() {
    
    this.title = "每日廣告 VIEW";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.operation = function() {
      
      window.ecAdview = function() {
        // check finished
        var $span = $("#sViewStatus").find("span[class='fbNeg']:contains('廣告e元獎勵已入帳'),span[class='fbPos']:contains('已加入您的EmailCash帳戶')");
        if ($span.length > 0) {
          Logger.log($span.text().trim());
          Logger.debug('ad finished');
          
          window.adFinished = true;
          
          try {
            Logger.debug('call window.opener.onAdClosed()');
            window.opener.onAdClosed();
          } catch (e) {
            console.log(e);
            if (Config.debug) {
              alert(e);
            } else {
              window.close();
            }
          };
          //window.close();
          return;
        }
        
        // ------------------------------
        
        /// set focus
        $("#frameTop").attr("value", "1");
        
        /// jump second
        /*
        $obj = $("#curSec");
        if ($obj.length > 0) {
          var second = parseInt($obj.text());
          if (second > 1) {
            $obj.text("1");
          }
          Logger.debug("curSec: " + second);
        }
        */
        
        /// retry later
        Logger.debug("Retry later ...");
        window.setTimeout(window.ecAdview, 1000);
      };
      window.ecAdview();
      
    };
    
  }
  
  AdviewOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
  // [Question]
  // ====================================================================================================
  
  function QuestionOperator() {
    
    this.title = "每日問答";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.operation = function() {
      $obj = $("*:contains('謝謝您的參與，您已經獲得了今天的獎勵'),*:contains('感謝您的回應，您獲得了')");
      if ($obj.length > 0) {
        Logger.log($obj.text().trim());
        this.go_account(Config.redirectDelay);
        return;
      }
      
      // ------------------------------
      
      $obj = $("*:contains('目前的問題您都回答過了，請按下確認鈕取得本日點數')");
      if ($obj.length > 0) {
        Logger.log($obj.text().trim());
        $input = $obj.find("input[type='submit']");
        if ($input.length > 0) {
          Logger.log("click submit button");
          $input.click();  //$input.trigger("click");
        } else {
          Logger.error("Missing submit button");
        }
        return;
      }
      
      // ------------------------------
      
      /*
      <div class="tr">
          <div class="td">1</div>
          <div class="td" style="text-align:left; padding-left:5px;">女性經痛調查</div>
          <div class="td">1</div>
          <div class="td tdColor">3 e元 + 1 金幣</div>
          <div class="td" style="padding-top:5px">
              <input type="image" name="ctl00$mainPlaceHolder$rptQP$ctl00$ibtnQP" id="ctl00_mainPlaceHolder_rptQP_ctl00_ibtnQP" src="../images/rewards/dailySurvey/edit.gif" style="border-width:0px;">
              <input type="hidden" name="ctl00$mainPlaceHolder$rptQP$ctl00$hidSid" id="ctl00_mainPlaceHolder_rptQP_ctl00_hidSid" value="301">
              <input type="hidden" name="ctl00$mainPlaceHolder$rptQP$ctl00$hidIdtCode" id="ctl00_mainPlaceHolder_rptQP_ctl00_hidIdtCode" value="E8AAAAD0-7DDD-45D9-934F-AAE5246267BA">
          </div>
      </div>
      */
      var $input = $("div[class='td'] input[type='image']");
      if ($input != "undefined") {
        $input.click();
        return;
      }
      
      // ------------------------------
      
      Logger.error("action terminated.");
    };
    
  }
  
  QuestionOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
  // [Account]
  // ====================================================================================================
  
  function AccountOperator() {
    
    this.title = "e元報表";
    
    // ----------------------------------------------------------------------------------------------------
    
    this.operation = function() {
      ///<a href="account.asp?go=points&amp;u=w214nt8f4f2o&amp;c=B0EE1F5580D0F7A&amp;st=last"><b>&lt;&lt;</b> 上月明細</a>
      
      Logger.debug('scroll to end');
      var scrollTop = Math.max(0, $("td a:contains('上月明細')").offset().top - 100);
      $("body").scrollTop(scrollTop);
      
      /*
      // ok
      $('html, body').animate({
        scrollTop: $("td a:contains('上月明細')").offset().top - 100
      }, 1000);
      */
      
      // check again if not all complete
      this.go_next();
    };
    
  }
  
  AccountOperator.prototype = new Operator;
  
  
  
  // ====================================================================================================
