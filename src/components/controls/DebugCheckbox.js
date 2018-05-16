// ====================================================================================================
// [DebugCheckbox]
// ====================================================================================================
import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import { AppConfig } from '../../global';
import { EmailCacheConfig } from '../../lib/ChromeStorage';

export class DebugCheckbox extends Component {

  render() {
    return (
      <div className="EmailCacheConfig debug">
        <Label check>
          <Input id="debug" type="checkbox"
            checked={EmailCacheConfig.debug ? true : false}
            onChange={this._handleChange} />{`Debug`}
        </Label>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleChange = (event: Event) => {
    EmailCacheConfig.debug = event.currentTarget.checked;
    // console.log(`[CHANGE] [EmailCacheConfig.debug]`, EmailCacheConfig.debug);
    this.forceUpdate();

    EmailCacheConfig.save([`debug`]);
  }

};
