  // ====================================================================================================
  // [Config]
  // ====================================================================================================
  
  var Config = {
    name: "EmailCash",
    
    title: null,
    
    version: '2.0.1',
    
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
    console.debug("[Config]", Config);
  });
  
  
  
  // ----------------------------------------------------------------------------------------------------
