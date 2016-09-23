  // ====================================================================================================
  // [Config]
  // ====================================================================================================
  
  var Config = {
    name: "EmailCashOperator",
    
    title: null,
    
    version: '2.1.1',
    
    // --------------------------------------------------
    
    debug: /*/ true /*/ false /**/,
    
    redirectDelay: /*/ 3000 /*/ 0 /**/
  }
  
  // [chrome.storage]
  chrome.storage.sync.get({
    debug: false,
    redirect_delay: 0
  }, function(items) {
    Config.debug = items.debug;
    Config.redirectDelay = items.redirect_delay;
    console.debug("[" + Config.name + "] [Config]", Config);
  });
  
  
  
  // ----------------------------------------------------------------------------------------------------
