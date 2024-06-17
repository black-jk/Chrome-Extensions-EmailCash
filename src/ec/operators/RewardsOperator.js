// ====================================================================================================
// [Question]
// ====================================================================================================
import { AppConfig } from '../../global';
import { Logger } from '../../lib/Logger';
import { Operator } from './Operator';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { ECTools } from '../../lib/ECTools';
import { DelayTimer } from '../../lib/DelayTimer';

export class RewardsOperator extends Operator {

  title: String = "問卷";



  // ----------------------------------------------------------------------------------------------------

  operation() {
    // <a class="btn btn-lg btn-success" title="點擊開始問卷" data-href="https://enter.ipsosinteractive.com/landing/?..." data-target="self" data-alert="">同意並開始問卷</a>

    let $links = $("a[title=點擊開始問卷]");
    if ($links.length > 0) {
      Logger.log($links.text().trim());
      try {
        $links[0].click();
      } catch (e) {
        Logger.error(e);
      }
      return;
    }

    Logger.error("action terminated.");
  }

};
