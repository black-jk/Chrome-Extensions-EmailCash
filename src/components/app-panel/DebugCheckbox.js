// ====================================================================================================
// [DebugCheckbox]
// ====================================================================================================
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { AppConfig } from '../../global';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class DebugCheckbox extends Component {

  render() {
    let backgroundColor: String = (EmailCacheConfig.debug) ? "#28a745" : "";

    return (
      <span>
        <Button size="sm" style={{ width: 80, backgroundColor: backgroundColor }}
          onClick={this._handleClick}>{`Debug: ${EmailCacheConfig.debug ? "on" : "off"}`}</Button>
      </span>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleClick = (event) => {
    EmailCacheConfig.debug = !EmailCacheConfig.debug;
    // console.log(`[CHANGE] []`, EmailCacheConfig.debug);
    this.forceUpdate();
  }

};
