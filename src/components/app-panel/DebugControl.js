// ====================================================================================================
// [DebugControl]
// ====================================================================================================
import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { Logger } from '../../lib/Logger';
import { AppConfig } from '../../global';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class DebugControl extends Component {

  render() {
    let backgroundColor: String = (EmailCacheConfig.debug) ? "#ffc107" : "#28a745";

    return (
      <div>
        <Label>{`Debug`}</Label>
        <br />
        <Button size="sm" style={{ backgroundColor: backgroundColor }}
          onClick={this._handleClick}><b>{`${EmailCacheConfig.debug ? "ON" : "OFF"}`}</b></Button>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleClick = (event) => {
    Logger.debug(`[save] EmailCacheConfig.debug: ${EmailCacheConfig.debug}`)
    EmailCacheConfig.debug = !EmailCacheConfig.debug;
    EmailCacheConfig.save([`debug`], () => {
      Logger.debug(`[save] done!`)
      this.forceUpdate();
    });
  }

};
