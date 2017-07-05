// ====================================================================================================
// [AppPanel]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import DraggableCore from 'react-draggable';
import RefreshTimeLabel from './refresh/RefreshTimeLabel';
import LoggerPanel from './logger/LoggerPanel';

export class AppPanel extends React.Component {
  render() {
    let { operatorTitle, loggersCount } = this.props;
    return (
      <DraggableCore>
        <div className="EmailCashPanel">
          <div style={{ border: "0px 0px 0px 1px black" }}>
            <span>[{operatorTitle ? operatorTitle : "n/a"}]</span>
            <RefreshTimeLabel />
            <LoggerPanel {...this.props} />
          </div>
        </div>
      </DraggableCore>
    );
  }
};