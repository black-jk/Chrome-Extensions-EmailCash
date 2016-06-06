  // ====================================================================================================
  // [Main]
  // ====================================================================================================
  
  var main = function() {
    var location = window.location.toString();
    if (Config.debug) {
      Logger.debug("[main] location: " + location);
    }
    
    // exclude (double check)
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/(login\.asp|itemjoin\.asp|FaceBook\/WebLogin.asp.*)$/)) {
      console.log('[main] skip!');
      return;
    }
    
    $(document).ready(execute);
  };
  
  // ----------------------------------------------------------------------------------------------------
  
  var execute = function() {
    Logger.debug("[execute] start");
    
    var location = window.location.toString();
    Logger.debug("[execute] location: " + location);
    
    var operator = null;
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/?(default\.asp)?$/)) {
      operator = new HomeOperator;
    } else
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/earn.asp\?go=qsurvey/)) {
      operator = new QuestionOperator;
    } else
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Rewards\/DailyAdvertising.aspx/)) {
      operator = new AdclickOperator;
    } else
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/4G\/Rewards\/DailyAdClicks.aspx\?id=/)) {
      operator = new AdviewOperator;
    } else
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/dailylatto\.asp/i)) {
      operator = new LattoOperator();
    } else
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/account\.asp/)) {
      operator = new AccountOperator();
    } else
    if (location.match(/^http:\/\/(www\.)?emailcash\.com\.tw\/(login|itemjoin|account|adtop)\.asp/)) {
      Logger.debug("[execute] Do nothing for url: '" + location + "'");
    } else {
      // [TODO] fix match url
      //Logger.warn("Unknown type of url: '" + location + "'");
    }
    
    if (operator != null) {
      Config.title = operator.title; // [TODO] move to class
      operator.run();
    }
    
    Logger.debug("[execute] end");
  }; // execute()
  
  // ----------------------------------------------------------------------------------------------------
  
  if (window.jQuery) {
    main();
  } else {
    Logger.debug('Load jQuery');
    window.onload = function() {
      Tools.loadJQuery(function() {
        // do nothing
      });
      main();
    };
  }
  
  
  
  // ----------------------------------------------------------------------------------------------------
