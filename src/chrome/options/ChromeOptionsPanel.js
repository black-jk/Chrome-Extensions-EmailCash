// ====================================================================================================
// [ChromeOptionsPanel]
// ====================================================================================================
import React from 'react';
import { Alert, Label, Button, Form, FormGroup, Col, Input } from 'reactstrap';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { AppConfig } from '../../global';
import { Operator } from '../../ec/operators/Operator';

export class ChromeOptionsPanel extends React.Component {

  state: Object = {
    errorMsg: "",
    successMsg: "",
  }

  // ----------------------------------------------------------------------------------------------------

  componentDidMount() {
    EmailCacheConfig.on("event_read_complete", this._handleReadComplete);
    EmailCacheConfig.on("event_save_complete", this._handleSaveComplete);
    EmailCacheConfig.read();
  }

  // ----------------------------------------------------------------------------------------------------

  render() {
    let operator: Operator = new Operator;

    let { errorMsg, successMsg } = this.state;

    this.state.errorMsg = "";
    this.state.successMsg = "";

    return (
      <div className="ChromeOptionsPanel">
        <Alert color="primary">
          {`[${AppConfig.name}] v${AppConfig.version}`}
        </Alert>

        <div style={{ padding: 15 }}>
          <Alert color="danger" style={{ padding: "5px 15px" }} hidden={!errorMsg}>{errorMsg}</Alert>
          <Alert color="success" style={{ padding: "5px 15px" }} hidden={!successMsg}>{successMsg}</Alert>

          <Form>
            {/* [Debug] */}
            <FormGroup inline check>
              <Label className="FontLabel" check>
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

            {/* [redirectDelay] */}
            <FormGroup inline check>
              <Label className="FontLabel" check>
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


            {/* [startTimeout, refreshDelay] */}
            <FormGroup row style={{ marginTop: 10 }}>
              <Label className="FontLabel" for={`startTimeoutInput`} sm={4}>{`Start Timeout (sec)`}</Label>
              <Col xs={2} style={{ padding: "5px 30px 5px 0px" }}>
                <Input id="startTimeoutInput" type="number" bsSize="sm"
                  step="1" min="0" max="600"
                  value={parseInt(EmailCacheConfig.startTimeout)}
                  onChange={(event) => {
                    EmailCacheConfig.startTimeout = parseInt(event.currentTarget.value);
                    // console.log(`[CHANGE] [EmailCacheConfig.startTimeout]`, EmailCacheConfig.startTimeout);
                    this.forceUpdate();
                  }} />
              </Col>

              <Label className="FontLabel" for={`startTimeoutInput`} sm={4}>{`Refresh Delay (sec)`}</Label>
              <Col xs={2} style={{ padding: "5px 30px 5px 0px" }}>
                <Input id="refreshDelayInput" type="number" bsSize="sm"
                  step="1" min="0" max="600"
                  value={parseInt(EmailCacheConfig.refreshDelay)}
                  onChange={(event) => {
                    EmailCacheConfig.refreshDelay = parseInt(event.currentTarget.value);
                    // console.log(`[CHANGE] [EmailCacheConfig.refreshDelay]`, EmailCacheConfig.refreshDelay);
                    this.forceUpdate();
                  }} />
              </Col>
            </FormGroup>

            <hr size="1" />

            <ECTimeFormGroup operator={operator} label="每日廣告" name="lastAdClickedAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} label="每日問答" name="lastDailySurveyAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} label="以小搏大" name="lastDailyGameAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup operator={operator} label="問卷" name="lastSurveyAt" onChange={() => { this.forceUpdate(); }} />

            <hr size="1" />

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
    this.setState({
      successMsg: `Saved`,
    });
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
    let label: String = this.props.label;
    let name: String = this.props.name;
    let onChange: Function = this.props.onChange || (() => { });

    let [date, time] = operator.parseNextActionDatetime(EmailCacheConfig[name]).split(" ");

    return (
      <FormGroup row>
        <Label className="FontLabel" for={`${name}Input`} sm={4}>{`${label}`}</Label>
        <Col sm={4}>
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
