// ====================================================================================================
// [AppPanel]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import KeyCode from 'keycode-js';
import DraggableCore from 'react-draggable';
import { HotKeyManager, AppConfig } from '../global';
import { RefreshTimeLabel } from './refresh/RefreshTimeLabel';
import { LoggerPanel } from './logger/LoggerPanel';
import { CombinationListener } from '../ec/managers/HotKeyManager';

export class AppPanel extends React.Component {

  state = {
    hidden: !AppConfig.debug,
  };

  // --------------------------------------------------

  _combinationListener: CombinationListener = new CombinationListener([`alt+${KeyCode.KEY_BACK_QUOTE}`], this, () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  });

  // --------------------------------------------------

  componentDidMount() {
    HotKeyManager.registerListener(this._combinationListener);
  }

  // --------------------------------------------------

  componentWillUnmount() {
    HotKeyManager.unregisterListener(this._combinationListener);
  }

  // ----------------------------------------------------------------------------------------------------

  render() {
    let { operatorTitle, loggersCount } = this.props;

    return (
      <DraggableCore>
        <div className="EmailCashPanel" hidden={this.state.hidden}>
          <div className="Header">
            <div>{operatorTitle ? operatorTitle : "n/a"}</div>
            <RefreshTimeLabel />
          </div>
          <LoggerPanel {...this.props} />
        </div>
      </DraggableCore>
    );
  }

};
