// ====================================================================================================
// [AppPanel]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import DraggableCore from 'react-draggable';
import LoggerPanel from './logger/LoggerPanel';

export class AppPanel extends React.Component {
  render() {
    let { operatorTitle, operatorAction, loggersCount } = this.props;
    return (
      <DraggableCore>
        <div className="EmailCashPanel">
          <div style={{ border: "0px 0px 0px 1px black" }}>
            <span>{operatorTitle}: {operatorAction}</span>
            <LoggerPanel {...this.props} />
          </div>
        </div>
      </DraggableCore>
    );
  }
};