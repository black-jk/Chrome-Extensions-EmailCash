// ====================================================================================================
// [LoggerPanel]
// ====================================================================================================
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LoggerData } from '../../lib/data/LoggerData';

class LoggerPanel extends Component {

  componentDidUpdate(prevProps, prevState) {
    // scroll to bottom
    let { contentsDiv } = this.refs;
    contentsDiv.scrollTop = contentsDiv.scrollHeight - contentsDiv.clientHeight;
  }

  // --------------------------------------------------

  render() {
    let logs = LoggerData.logs;
    return (
      <div className="LoggerPanel" ref="contentsDiv">
        {
          logs.map((loggerData, index) => {
            let span = <span key={index} style={{ color: loggerData.getColor() }}>{loggerData.message}<br /></span>
            return span;
          })
        }
      </div>
    );
  }
}

export default LoggerPanel;
