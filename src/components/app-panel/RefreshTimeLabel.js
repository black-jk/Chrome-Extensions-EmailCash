// ====================================================================================================
// [RefreshTimeLabel]
// ====================================================================================================
import React, { Component } from 'react';
import { AppConfig } from '../../global';

export class RefreshTimeLabel extends Component {

  _intervalId: Number = 0;

  componentDidMount() {
    this._intervalId = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._intervalId);
  }

  // --------------------------------------------------

  render() {
    let { dailyRestartAt, timeoutRestartAt } = AppConfig;
    let now: Date = new Date;
    let nowTime: Number = now.getTime();

    let dailyRestartTime: Number = (dailyRestartAt - nowTime) / 1000;
    let timeoutRestartTime: Number = (timeoutRestartAt - nowTime) / 1000;

    return (
      <div className="TimerLabel">
        {
          (timeoutRestartTime > 0) ?
            <span>{`Timeout: ${timeoutRestartTime.toFixed(0)}`}</span> : null
        }
        <span>{`Reload: ${dailyRestartTime.toFixed(0)}`}</span>
      </div>
    );
  }

};
