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
      <span>
        <Label>{`Status: `}</Label>
        <Button size="sm" style={{ width: 70, backgroundColor: backgroundColor }}
          onClick={this._handleClick}><b>{`${EmailCacheConfig.pause ? "PAUSE" : "RUN"}`}</b></Button>
      </span>
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
