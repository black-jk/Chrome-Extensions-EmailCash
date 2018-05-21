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
        <span>{`Timeout: ${(timeoutRestartTime > 0) ? timeoutRestartTime.toFixed(0) : "--"}`}</span>
        <span>{`Reload: ${dailyRestartTime.toFixed(0)}`}</span>
      </div>
    );
  }

};
