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
      <div style={{ position: "absolute", top: 20, right: 20, width: 550, backgroundColor: "#EEEEEE" }}>
        <Alert color="primary">
          {`[${AppConfig.name}] v${AppConfig.version}`}
        </Alert>
        <div style={{ padding: 15 }}>
          <Form>
            <FormGroup inline check>
              <Label check>
                <Input id="debug" type="checkbox"
                  checked={EmailCacheConfig.debug ? true : false}
                  onChange={(event) => {
                    EmailCacheConfig.debug = event.currentTarget.checked;
                    // console.log(`[CHANGE] [EmailCacheConfig.debug]`, EmailCacheConfig.debug);
                    this.forceUpdate();
                  }} />{`Debug Mode`}
              </Label>
            </FormGroup>
            <span>{`　`}</span>

            <FormGroup inline check>
              <Label check>
                <Input id="debug" type="checkbox"
                  checked={EmailCacheConfig.redirectDelay ? true : false}
                  onChange={(event) => {
                    EmailCacheConfig.redirectDelay = event.currentTarget.checked;
                    // console.log(`[CHANGE] [EmailCacheConfig.redirectDelay]`, EmailCacheConfig.redirectDelay);
                    this.forceUpdate();
                  }} />{`Redirect Delay (sec)`}
              </Label>
            </FormGroup>
            <FormGroup inline check>
              <Input id="redirectDelayTimeInput" type="number" bsSize="sm"
                step="1" min="0" max="600"
                value={parseInt(EmailCacheConfig.redirectDelayTime) / 1000}
                onChange={(event) => {
                  EmailCacheConfig.redirectDelayTime = parseInt(event.currentTarget.value) * 1000;
                  // console.log(`[CHANGE] [EmailCacheConfig.redirectDelayTime]`, EmailCacheConfig.redirectDelayTime);
                  this.forceUpdate();
                }} />
            </FormGroup>
            <br />
            <br />

            <ECTimeFormGroup operator={operator} name="lastAdClickedAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} name="lastDailySurveyAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} name="lastDailyGameAt" onChange={() => { this.forceUpdate(); }} />

            <FormGroup style={{ marginTop: 25 }}>
              <span>{`　`}</span>
              <Button color="danger" onClick={this._handleRestoreClick}>{`Restore`}</Button>
              <span>{`　`}</span>
              <Button color="primary" onClick={this._handleSaveClick}>{`Save`}</Button>
            </FormGroup>
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
      <FormGroup row>
        <Label for={`${name}Input`} sm={3}>{`${name}`}</Label>
        <Col sm={5}>
          <Input id={`${name}Input`} type="date" name="date" bsSize="sm"
            value={date}
            onChange={(event) => {
              this._handleChange(`${event.currentTarget.value} ${time}`);
              onChange();
            }} />
        </Col>
        <Col sm={4}>
          <Input type="time" name="time" bsSize="sm"
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
