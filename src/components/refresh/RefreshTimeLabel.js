// ====================================================================================================
// [RefreshTimeLabel]
// ====================================================================================================
import React, { Component } from 'react';
import { AppConfig } from '../../global';


export default class RefreshTimeLabel extends Component {

  _intervalId = 0;

  componentDidMount() {
    this._intervalId = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  // --------------------------------------------------

  render() {
    let { dailyRestartAt, timeoutRestartAt } = AppConfig;
    let now = new Date;
    let nowTime = now.getTime();

    let dailyRestartTime = (dailyRestartAt - nowTime) / 1000;
    let timeoutRestartTime = (timeoutRestartAt - nowTime) / 1000;

    let style = {
      // top: 7,
      // right: 10,
      // position: "absolute",
    };

    return (
      <div style={style}>
        [Reload: <span>{dailyRestartTime.toFixed(0)}]</span>
      </div>
    );
  }

  // --------------------------------------------------

  componentWillUnmount() {
    clearInterval(this._intervalId);
  }

  // --------------------------------------------------

};
