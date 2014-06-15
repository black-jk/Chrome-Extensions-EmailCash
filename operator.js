// ==UserScript==
// @name            EmailCash Daily Operator
// @version         0.1
// @author          BlackJK
// @namespace       EmailCash

// @include         http://emailcash.com.tw*
// @include         http://www.emailcash.com.tw*

// ==/UserScript==
  
  /*
  [NOTE]
    
    http://ithelp.ithome.com.tw/question/10095237?tag=rss.qu
    
  */
  
  // ====================================================================================================
  
  function exec(fn, debug) {
    /*/
    fn();
    /*/
    $(document).ready(function() {
      var script = document.createElement('script');
      script.setAttribute("type", "application/javascript");
      script.textContent = '(' + fn + ')();';
      document.body.appendChild(script); // run the script
      if (!debug) {
        document.body.removeChild(script); // clean up
      }
    });
    /**/
  }
  
  // ====================================================================================================
  
  exec(function() {
    
    var US = window.US = {
      
      // ----------------------------------------------------------------------------------------------------
      // [properties]
      // ----------------------------------------------------------------------------------------------------
      
      name: "EC",
      title: null,
      
      
      
      // ----------------------------------------------------------------------------------------------------
      // [tools]
      // ----------------------------------------------------------------------------------------------------
      
      log: function(msg) {
        console.log("[" + US.name + "] [LOG] " + (US.title ? "[" + US.title + "] " : "") + msg);
      },
      warn: function(msg) {
        console.warn("[" + US.name + "] [WARN] " + (US.title ? "[" + US.title + "] " : "") + msg);
      },
      error: function(msg) {
        console.error("[" + US.name + "] [ERROR] " + (US.title ? "[" + US.title + "] " : "") + msg);
      },
      debug: function(msg) {
        console.debug("[" + US.name + "] [DEBUG] " + (US.title ? "[" + US.title + "] " : "") + msg);
      },
      
      // ----------------------------------------------------------------------------------------------------
      
      goto: function(url, sleep) {
        US.debug("goto '" + url + "'   (sleep: " + sleep + ")");
        if (sleep > 0) {
          window.setTimeout(function() {
            window.location = url;
          }, sleep);
        } else {
          window.location = url;
        }
      },
      
      // ----------------------------------------------------------------------------------------------------
      
      loadJQuery: function(callback) {
        var script = document.createElement("script");
        //script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        //script.setAttribute("src", "http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js");
        script.setAttribute("src", "http://www.emailcash.com.tw/lib/jquery.min_1.6.1.js");
        //script.setAttribute("src", "http://code.jquery.com/jquery-1.9.1.js");
        
        script.addEventListener("load", function() {
          var script = document.createElement("script");
          script.textContent = "(" + callback.toString() + ")();";
          document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
      },
      
      
      
      // ----------------------------------------------------------------------------------------------------
      // [functions]
      // ----------------------------------------------------------------------------------------------------
      
      main: function() {
        
        var location = window.location.toString();
        US.debug("location: " + location);
        
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/?(default\.asp)?$/)) {
          US.title = "EmailCash";
          US.goto("http://www.emailcash.com.tw/dailylatto.asp", 1000);
        } else
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/earn.asp\?go=qsurvey/)) {
          US.title = "每日問答";
          US.debug("START");
          
          // ------------------------------
          
          $td = $("td[colspan='4']:contains('謝謝您的參與，您已經獲得了今天的獎勵'),td[class='fbPos']:contains('感謝您的回應，您獲得了')");
          if ($td.length > 0) {
            US.log($td.text().trim());
            var href = $("a[title='查看e元報表']").attr("href");
            US.goto(href, 1000);
            US.debug("DONE");
            return;
          }
          
          // ------------------------------
          
          $td = $("td:contains('目前的問題您都回答過了，請按下確認鈕取得本日點數')");
          if ($td.length > 0) {
            US.log($td.text().trim());
            $input = $td.find("input[type='submit']");
            if ($input.length > 0) {
              $input.click();  //$input.trigger("click");
              US.debug("DONE");
            } else {
              US.error("Missing submit button");
            }
            return;
          }
          
          // ------------------------------
          
          US.error("action terminated.");
          
        } else
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/adclicks\.asp/)) {
          US.title = "每日廣告";
          US.debug("START");
          
          // ------------------------------
          
          /// <a href="view_adc.asp?id=1711&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="UDN買東西">UDN買東西</a>
          /// <a href="view_adc.asp?id=1895&amp;sid=543928748&amp;u=w214nt8f4f2o&amp;c=244F90E1C2BB7C6" target="_blank" title="IKEA 櫥櫃收納">IKEA 櫥櫃收納</a>
          
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
              US.debug("Missing url of '"+pattern+"'.");
            }
            
            return undefined;
          })();
          
          if (!$href) {
            US.debug("Retry ...");
            US.goto("http://www.emailcash.com.tw/adclicks.asp", 1000);
            return;
          }
          
          // ------------------------------
          
          /// open ad-view url
          US.log("open url: '" + $href + "'  (waiting for callback)");
          var adWindow = window.open($href, "", "width:100, height:100");
          
          /// set callback function and wait
          adWindow.adClosed = function() {
            adWindow.close();
            US.debug("DONE");
            US.goto("http://www.emailcash.com.tw/earn.asp?go=qsurvey", 1000);
            return;
          };
          
          US.debug("Waiting for callback ...");
          
        } else
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/view_adc\.asp/)) {
          US.title = "每日廣告 VIEW";
          US.debug("START");
          
          // ------------------------------
          
          if (!window.adClosed) {
            window.adClosed = function() {
              US.debug("DONE");
              window.close();
            };
            alert("Missing function window.adClosed();");
            US.warn("Missing function window.adClosed();");
          }
          
          // ------------------------------
          
          US.loadJQuery(window.ecAdview = function() {
          //window.ecAdview = function() {
            var $topFrame = $(window.parent.frames["topFrame"].document);
            
            /// <span id="lblMsg"><span class="fbNeg"><img src="edmrating/images/topFrameCrossBox.gif" align="absmiddle" border="0" vspace="2">廣告e元獎勵已入帳</span></span>
            /// <span id="lblMsg"><span class="fbPos"><img src="edmrating/images/topFrameTickBox.gif" align="absmiddle" border="0" vspace="2">2 e元及1金幣已加入您的EmailCash帳戶</span></span>
            var $span = $topFrame.find("#lblMsg").find("span[class='fbNeg']:contains('廣告e元獎勵已入帳'),span[class='fbPos']:contains('已加入您的EmailCash帳戶')");
            if ($span.length > 0) {
              /// done
              US.log($span.text().trim());
              window.setTimeout(window.adClosed, 1000);
              return;
            }
            
            // ------------------------------
            
            /// set focus
            $topFrame.find("#frameTop").attr("value", "1");
            
            /// jump second
            $obj = $topFrame.find("#curSec");
            if ($obj.length > 0) {
              var second = parseInt($obj.text());
              if (second > 1) {
                $obj.text("1");
              }
              US.debug("curSec: " + second);
            }
            
            /// retry later
            US.debug("Retry later ...");
            window.setTimeout(window.ecAdview, 1000);
          //};
          //window.ecAdview();
          });
          
        } else
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/dailylatto\.asp/i)) {
          US.title = "每日樂透";
          US.debug("START");
          
          // ------------------------------
          
          $b = $("font[size='3'] b:contains('您還沒參與本期每日樂透')");
          if ($b != null && $b.length > 0) {
            US.log("found: '" + $b.text().trim() + "'");
            
            US.log("call: barclick();");
            window.barclick();
            
            US.log("call: stopBar();");
            stopBar();
            
            US.log("call: checknumber();");
            checknumber();
            
            US.log("call: lattoSentfun();");
            lattoSentfun();
            
            US.debug("DONE");
          } else {
            US.debug("DONE");
            US.goto("http://www.emailcash.com.tw/adclicks.asp", 1000);
          }
          
        } else
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/account\.asp/)) {
          US.title = "e元報表";
          US.debug("START");
          
          US.loadJQuery(function() {
            ///<a href="account.asp?go=points&amp;u=w214nt8f4f2o&amp;c=B0EE1F5580D0F7A&amp;st=last"><b>&lt;&lt;</b> 上月明細</a>
            var scrollTop = Math.max(0, $("td a:contains('上月明細')").offset().top - 100);
            $("body").scrollTop(scrollTop);
            
            /* // ok
            $('html, body').animate({
              scrollTop: $("td a:contains('上月明細')").offset().top - 100
            }, 1000);
            */
            
            US.debug("DONE");
          });
          
        } else
        if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/(login|itemjoin|account|adtop)\.asp/)) {
          US.debug("Do nothing for url: '" + location + "'");
        } else {
          // [TODO] fix match url
          //US.warn("Unknown type of url: '" + location + "'");
        }
        
        // ----------------------------------------------------------------------------------------------------
        
      }, // main()
      
      end: null
    };
    
    // ----------------------------------------------------------------------------------------------------
    
    var location = window.location.toString();
    
    // exclude for http://www.emailcash.com.tw/login.asp
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/(login\.asp|itemjoin\.asp|FaceBook\/WebLogin.asp.*)$/)) {
      return;
    }
    
    US.debug("location: " + location);
    window.onload = US.main;
    
    // ----------------------------------------------------------------------------------------------------
    
  }, false); // exec
