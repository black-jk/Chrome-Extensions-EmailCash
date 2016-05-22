  // ====================================================================================================
  // [Library]
  // ====================================================================================================
  
  function exec(fn) {
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
  }
  
  
  
  // ====================================================================================================
  
  // [Logger]
  
  var Logger = {
    
    log: function(msg) {
      var _msg = Logger.getHeader("LOG") + msg;
      console.debug(_msg);
      Logger.addLog(_msg, "log");
    },
    
    warn: function(msg) {
      var _msg = Logger.getHeader("WARN") + msg;
      console.debug(_msg);
      Logger.addLog(_msg, "warn");
    },
    
    error: function(msg) {
      var _msg = Logger.getHeader("ERROR") + msg;
      console.debug(_msg);
      Logger.addLog(_msg, "error");
    },
    
    debug: function(msg) {
      var _msg = Logger.getHeader("DEBUG") + msg;
      console.debug(_msg);
      Logger.addLog(_msg, "debug");
    },
    
    // ----------------------------------------------------------------------------------------------------
    
    addLog: function(msg, type) {
      var key = "log-" + type;
      var getter = {};
      getter[key] = "";
      
      chrome.storage.local.get(getter, function(result) {
        
console.debug(result);
        
        var setter = {};
        setter[key] = result.log + "\n" + msg;
console.debug("setter:", setter);
        chrome.storage.local.set(setter, function(result) {
          
console.debug(result);
          
        });
        
        
        
      });
    },
    
    // ----------------------------------------------------------------------------------------------------
    
    getHeader: function(type) {
      return "[" + Config.name + "] [" + type + "] " + (Config.version ? "[" + Config.version + "] " : "") + (Config.title ? "[" + Config.title + "] " : "");
    }
    
  }
  
  
  
  // ====================================================================================================
  
  // [Tools]
  
  var Tools = {
    
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
    }
    
  };
  
  
  
  // ====================================================================================================
