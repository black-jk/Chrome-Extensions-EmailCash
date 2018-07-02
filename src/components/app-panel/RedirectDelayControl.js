// ====================================================================================================
// [RedirectDelayControl]
// ====================================================================================================
import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { Logger } from '../../lib/Logger';
import { AppConfig } from '../../global';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class RedirectDelayControl extends Component {

  render() {
    let backgroundColor: String = (EmailCacheConfig.redirectDelay) ? "#ffc107" : "#28a745";

    return (
      <div>
        <Label>{`Delay`}</Label>
        <br />
        <Button size="sm" style={{ backgroundColor: backgroundColor }}
          onClick={this._handleClick}><b>{`${EmailCacheConfig.redirectDelay ? "ON" : "OFF"}`}</b></Button>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleClick = (event) => {
    Logger.debug(`[save] EmailCacheConfig.redirectDelay: ${EmailCacheConfig.redirectDelay}`)
    EmailCacheConfig.redirectDelay = !EmailCacheConfig.redirectDelay;
    EmailCacheConfig.save([`redirectDelay`], () => {
      Logger.debug(`[save] done!`)
      this.forceUpdate();
    });
  }

};
