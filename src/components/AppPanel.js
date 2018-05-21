// ====================================================================================================
// [AppPanel]
// ====================================================================================================
import React from 'react';
import { Button } from 'reactstrap';
import KeyCode from 'keycode-js';
import DraggableCore from 'react-draggable';
import { HotKeyManager, AppConfig } from '../global';
import { CombinationListener } from '../ec/managers/HotKeyManager';
import { RefreshTimeLabel } from './app-panel/RefreshTimeLabel';
import { DebugCheckbox } from './app-panel/DebugCheckbox';
import { LoggerPanel } from './app-panel/LoggerPanel';

export class AppPanel extends React.Component {

  state = {
    hidden: !AppConfig.debug,
  };

  // --------------------------------------------------

  _combinationListener: CombinationListener = new CombinationListener([`alt+${KeyCode.KEY_BACK_QUOTE}`], this, () => {
    this._toggleShowHide();
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
    let { hidden } = this.state;

    return (
      <DraggableCore>
        <div className={`EmailCashPanel ${hidden ? "small" : ""}`}>
          <div className="Header">
            <Button onClick={this._toggleShowHide}>{`-`}</Button>

            <div className="OperatorLabel">{operatorTitle ? operatorTitle : "n/a"}</div>

            <div>
              <span>{`　[可用: `}{$("a:contains('可用e元')").find("b").html()}{`e]`}</span>
              <span>{`　[定存: `}{$("a:contains('定存e元')").find("b").html()}{`e]`}</span>
            </div>

            <RefreshTimeLabel />

            <div className="controls">
              <DebugCheckbox />
              <span>
                <Button onClick={this._toggleShowHide}>{`-`}</Button>
              </span>
            </div>
          </div>
          <LoggerPanel {...this.props} hidden={hidden} />
        </div>
      </DraggableCore>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _toggleShowHide = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

};
