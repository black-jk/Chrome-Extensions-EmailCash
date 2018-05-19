// ====================================================================================================
// [LoggerPanel]
// ====================================================================================================
import React, { Component } from 'react';
import { LoggerData } from '../../lib/data/LoggerData';

export class LoggerPanel extends Component {

  componentDidUpdate(prevProps, prevState) {
    // scroll to bottom
    let { contentsDiv } = this.refs;
    contentsDiv.scrollTop = contentsDiv.scrollHeight - contentsDiv.clientHeight;
  }

  // --------------------------------------------------

  render() {
    let logs: Array = LoggerData.logs;

    return (
      <div className="LoggerPanel" ref="contentsDiv" hidden={this.props.hidden}>
        {
          logs.map((loggerData: LoggerData, index) => (
            <span key={index} style={{ color: loggerData.getColor() }}>{loggerData.message}<br /></span>
          ))
        }
      </div>
    );
  }

}
