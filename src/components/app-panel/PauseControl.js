// ====================================================================================================
// [PauseControl]
// ====================================================================================================
import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { Logger } from '../../lib/Logger';
import { AppConfig } from '../../global';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class PauseControl extends Component {

  render() {
    let backgroundColor: String = (EmailCacheConfig.pause) ? "#ffc107" : "#28a745";

    return (
      <div>
        <Label>{`Status`}</Label>
        <br />
        <Button size="sm" style={{ backgroundColor: backgroundColor }}
          onClick={this._handleClick}><b>{`${EmailCacheConfig.pause ? "PAUSE" : "RUN"}`}</b></Button>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleClick = (event) => {
    Logger.debug(`[save] EmailCacheConfig.pause: ${EmailCacheConfig.pause}`)
    EmailCacheConfig.pause = !EmailCacheConfig.pause;
    EmailCacheConfig.save([`pause`], () => {
      Logger.debug(`[save] done!`)
      this.forceUpdate();
    });
  }

};
