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
    let lines: Array = [];
    let logs: Array = LoggerData.logs;
    let index: Number = 0;
    logs.forEach((loggerData: LoggerData) => {
      loggerData.message.split("\n").forEach((line: String) => {
        lines.push(<span key={index++} style={{ color: loggerData.getColor() }}>{line}<br /></span>);
      });
    });

    return (
      <div className="LoggerPanel" ref="contentsDiv" hidden={this.props.hidden}>
        {
          lines
        }
      </div>
    );
  }

}
