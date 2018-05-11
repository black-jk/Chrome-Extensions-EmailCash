// ====================================================================================================
// [ChromeOptionsPanel]
// ====================================================================================================
import React from 'react';
import { Alert, Label, Button, Form, FormGroup, Col, Input } from 'reactstrap';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { AppConfig } from '../../global';
import { Operator } from '../../ec/operators/Operator';

export class ChromeOptionsPanel extends React.Component {

  componentDidMount() {
    EmailCacheConfig.on("event_read_complete", this._handleReadComplete);
    EmailCacheConfig.on("event_save_complete", this._handleSaveComplete);
    EmailCacheConfig.read();
  }

  // ----------------------------------------------------------------------------------------------------

  render() {
    let operator: Operator = new Operator;

    return (
      <div style={{ position: "absolute", top: 20, right: 20, width: 500, backgroundColor: "#EEEEEE" }}>
        <Alert color="primary" style={{ margin: 0 }}>
          {`[${AppConfig.name}] v${AppConfig.version}`}
        </Alert>
        <div style={{ padding: 15 }}>
          <Form>
            <FormGroup check>
              <Label check>
                <Input id="debug" type="checkbox" checked={EmailCacheConfig.debug}
                  onChange={(event) => {
                    EmailCacheConfig.debug = event.currentTarget.checked;
                    // console.log(`[CHANGE] [EmailCacheConfig.debug]`, EmailCacheConfig.debug);
                    this.forceUpdate();
                  }} />{`Debug Mode`}
              </Label>
            </FormGroup>

            <FormGroup row style={{ marginTop: 5 }}>
              <Label for="redirectDelayInput" sm={4}>{`Redirect Delay`}</Label>
              <Col sm={3}>
                <Input id="redirectDelayInput" type="number" bsSize="sm" style={{ marginTop: 5 }}
                  step="1000" min="0" max="50000"
                  value={EmailCacheConfig.redirectDelay}
                  checked={EmailCacheConfig.redirectDelay}
                  onChange={(event) => {
                    EmailCacheConfig.redirectDelay = parseInt(event.currentTarget.value);
                    // console.log(`[CHANGE] [EmailCacheConfig.redirectDelay]`, EmailCacheConfig.redirectDelay);
                    this.forceUpdate();
                  }} />
              </Col>
              <Col sm={5}></Col>
            </FormGroup>
            <br />

            <ECTimeFormGroup operator={operator} name="lastAdClickedAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} name="lastDailySurveyAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} name="lastDailyGameAt" onChange={() => { this.forceUpdate(); }} />
            <br />

            <span>{`　`}</span>
            <Button color="danger" onClick={this._handleRestoreClick}>{`Restore`}</Button>
            <span>{`　`}</span>
            <Button color="primary" onClick={this._handleSaveClick}>{`Save`}</Button>
          </Form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleReadComplete = () => {
    this.forceUpdate();
  }

  // ----------------------------------------------------------------------------------------------------

  _handleSaveComplete = () => {
    alert('Saved!');
  }

  // ----------------------------------------------------------------------------------------------------

  _handleRestoreClick = () => {
    EmailCacheConfig.read();
  }

  // ----------------------------------------------------------------------------------------------------

  _handleSaveClick = () => {
    EmailCacheConfig.save();
  }

};



// ====================================================================================================

class ECTimeFormGroup extends React.Component {

  render() {
    let operator: Operator = this.props.operator;
    let name: String = this.props.name;
    let onChange: Function = this.props.onChange || (() => { });

    let [date, time] = operator.parseNextActionDatetime(EmailCacheConfig[name]).split(" ");

    return (
      <FormGroup row style={{ marginTop: 5 }}>
        <Label for={`${name}Input`} sm={3}>{`${name}`}</Label>
        <Col sm={5}>
          <Input id={`${name}Input`} type="date" name="date" placeholder="date placeholder"
            value={date}
            onChange={(event) => {
              this._handleChange(`${event.currentTarget.value} ${time}`);
              onChange();
            }} />
        </Col>
        <Col sm={4}>
          <Input type="time" name="time" placeholder="date placeholder"
            value={time}
            onChange={(event) => {
              this._handleChange(`${date} ${event.currentTarget.value}`);
              onChange();
            }} />
        </Col>
      </FormGroup>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleChange(datetime: String) {
    // console.log(`[CHANGE] [datetime] ${datetime}`);
    let name: String = this.props.name;
    let time: Number = (new Date(datetime)).getTime();
    EmailCacheConfig[name] = time;
    this.forceUpdate();
  }

};
