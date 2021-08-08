// ====================================================================================================
// [ChromeOptionsPanel]
// ====================================================================================================
import React from 'react';
import { Alert, Label, Button, Form, FormGroup, Col, Input } from 'reactstrap';
import { ECTools } from '../../../lib/ECTools';
import { EmailCacheConfig } from '../../../lib/ChromeStorage';
import { AppConfig } from '../../../global';

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
    let { errorMsg, successMsg } = this.state;

    this.state.errorMsg = "";
    this.state.successMsg = "";

    return (
      <div className="ChromeOptionsPanel">
        <div className="PanelHeader">
          {`[${AppConfig.name}] v${AppConfig.version}`}
        </div>

        <div style={{ padding: 15 }}>
          <Alert color="danger" style={{ padding: "5px 15px" }} hidden={!errorMsg}>{errorMsg}</Alert>
          <Alert color="success" style={{ padding: "5px 15px" }} hidden={!successMsg}>{successMsg}</Alert>

          <Form>
            {/* [Debug] */}
            <Button size="sm" color={(EmailCacheConfig.debug) ? "warning" : "success"} style={{ width: 100 }}
              onClick={(event) => {
                EmailCacheConfig.debug = !EmailCacheConfig.debug;
                // console.log(`[CHANGE] []`, EmailCacheConfig.debug);
                this.forceUpdate();
              }}>{`Debug: ${EmailCacheConfig.debug ? "ON" : "OFF"}`}</Button>
            <span>{`　`}</span>

            {/* [redirectDelay] */}
            <Button size="sm" color={(EmailCacheConfig.redirectDelay) ? "warning" : "success"} style={{ width: 140, marginRight: 10 }}
              onClick={(event) => {
                EmailCacheConfig.redirectDelay = !EmailCacheConfig.redirectDelay;
                // console.log(`[CHANGE] [EmailCacheConfig.redirectDelay]`, EmailCacheConfig.redirectDelay);
                this.forceUpdate();
              }}>
              {`Redirect Delay: ${EmailCacheConfig.redirectDelay ? "ON" : "OFF"}　`}
            </Button>
            <FormGroup inline check>
              <Input id="redirectDelayTimeInput" type="number" bsSize="sm" style={{ width: 60 }}
                step="1" min="0" max="600"
                value={parseInt(EmailCacheConfig.redirectDelayTime) / 1000}
                onChange={(event) => {
                  EmailCacheConfig.redirectDelayTime = parseInt(event.currentTarget.value) * 1000;
                  // console.log(`[CHANGE] [EmailCacheConfig.redirectDelayTime]`, EmailCacheConfig.redirectDelayTime);
                  this.forceUpdate();
                }} />
            </FormGroup>

            {/* [Pause] */}
            <Button size="sm" color={(EmailCacheConfig.pause) ? "warning" : "success"} style={{ width: 100 }}
              onClick={(event) => {
                EmailCacheConfig.pause = !EmailCacheConfig.pause;
                // console.log(`[CHANGE] []`, EmailCacheConfig.pause);
                this.forceUpdate();
              }}>{`Pause: ${EmailCacheConfig.pause ? "ON" : "OFF"}`}</Button>
            <span>{`　`}</span>

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

              <Label className="FontLabel" for={`startTimeoutInput`} sm={4}>{`Daily Refresh Delay (sec)`}</Label>
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

            <ECTimeFormGroup label="每日廣告 (開始)" name="lastAdClickedAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup label="每日廣告 (完成)" name="lastAdFinishedAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup label="每日問答" name="lastDailySurveyAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup label="以小搏大" name="lastDailyGameAt" onChange={() => { this.forceUpdate(); }} />
            <ECTimeFormGroup label="問卷" name="lastSurveyAt" onChange={() => { this.forceUpdate(); }} />

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
    let label: String = this.props.label;
    let name: String = this.props.name;
    let onChange: Function = this.props.onChange || (() => { });

    let src: Number = EmailCacheConfig[name];
    let [date, time] = ECTools.parseNextActionDatetime(src).split(" ");

    return (
      <FormGroup row>
        <Label className="FontLabel" for={`${name}Input`} sm={3}>{`${label}`}</Label>
        <Col sm={3}>
          <Input id={`${name}Input`} type="date" name="date" bsSize="sm"
            value={date}
            onChange={(event) => {
              this._handleDatetimeChange(`${event.currentTarget.value} ${time}`);
              onChange();
            }} />
        </Col>
        <Col sm={3}>
          <Input type="time" name="time" bsSize="sm"
            value={time}
            onChange={(event) => {
              this._handleDatetimeChange(`${date} ${event.currentTarget.value}`);
              onChange();
            }} />
        </Col>
        <Col sm={3}>
          <Input type="text" bsSize="sm" value={src}
            onChange={(event) => {
              this._handleTimeChange(`${event.currentTarget.value}`);
              onChange();
            }} />
        </Col>
      </FormGroup>
    );
  }

  // ----------------------------------------------------------------------------------------------------

  _handleDatetimeChange(datetime: String) {
    let name: String = this.props.name;
    console.log(`[CHANGE] EmailCacheConfig.${name} = time of ${datetime}`);

    let time: Number = (new Date(datetime)).getTime();
    EmailCacheConfig[name] = time;
    this.forceUpdate();
  }

  // ----------------------------------------------------------------------------------------------------

  _handleTimeChange(time: String) {
    let name: String = this.props.name;
    console.log(`[CHANGE] EmailCacheConfig.${name} = ${time}`);

    EmailCacheConfig[name] = parseInt(time);
    this.forceUpdate();
  }

};
