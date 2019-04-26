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
import { DebugControl } from './app-panel/DebugControl';
import { RedirectDelayControl } from './app-panel/RedirectDelayControl';
import { PauseControl } from './app-panel/PauseControl';
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
          <div className="Header" onDoubleClick={this._toggleShowHide}>
            {
              // <Button onClick={this._toggleShowHide}>{`-`}</Button>
            }
            <div className="Label OperatorLabel">
              <div>{operatorTitle ? operatorTitle : "n/a"}<br />&nbsp;</div>
            </div>

            <div className="Label ProfileLabel">
              <div>{`可用`}<br />{$("a:contains('可　用')").find("b").find("span").html()}{`e`}</div>
              <div>{`定存`}<br />{$("a:contains('定　存')").find("b").find("span").html()}{`e`}</div>
              <div>{`經驗值`}<br />{$("a:contains('經驗值')").find("b").find("span").html()}{``}</div>
              <div>{`金幣`}<br />{$("a:contains('金　幣')").find("b").find("span").html()}{``}</div>
            </div>

            <RefreshTimeLabel />

            <div className="controls">
              <DebugControl />
              <RedirectDelayControl />
              <PauseControl />
              {
                // <span>
                //   <Button onClick={this._toggleShowHide}>{`-`}</Button>
                // </span>
              }
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
