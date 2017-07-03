// ====================================================================================================
// [AppPanel]
// ====================================================================================================
import React from 'react';
import ReactDOM from 'react-dom';

export class AppPanel extends React.Component {
  render() {
    let { operatorTitle, operatorAction } = this.props;

    return (
      <div className="EmailCashPanel">
        <div style={{ border: "0px 0px 0px 1px black" }}>
          <span>{operatorTitle}: {operatorAction}</span>
        </div>
      </div>
    );
  }
};