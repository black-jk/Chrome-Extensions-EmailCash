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
          <div className="Header">
            <div>[{operatorTitle ? operatorTitle : "n/a"}]</div>
            <RefreshTimeLabel />
          </div>
          <LoggerPanel {...this.props} />
        </div>
      </DraggableCore>
    );
  }
};