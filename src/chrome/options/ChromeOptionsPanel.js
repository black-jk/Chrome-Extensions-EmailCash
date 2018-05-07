// ====================================================================================================
// [ChromeOptionsPanel]
// ====================================================================================================
import React from 'react';
import { Alert, Label, Button, Form, FormGroup, Col, Input } from 'reactstrap';
import { EmailCacheConfig } from '../../lib/ChromeStorage';
import { AppConfig } from '../../global';

export class ChromeOptionsPanel extends React.Component {

  componentDidMount() {
    EmailCacheConfig.on("event_read_complete", this._handleReadComplete);
    EmailCacheConfig.on("event_save_complete", this._handleSaveComplete);
    EmailCacheConfig.read();
  }

  // ----------------------------------------------------------------------------------------------------

  render() {
    return (
      <div style={{ position: "absolute", top: 20, right: 20, width: 400, backgroundColor: "#EEEEEE" }}>
        <Alert color="primary" style={{ margin: 0 }}>
          {`[${AppConfig.name}] v${AppConfig.version}`}
        </Alert>
        <div style={{ padding: 15 }}>
          <Form>
            <FormGroup check>
              <Label check>
                <Input id="debug" type="checkbox" checked={EmailCacheConfig.debug}
                  onChange={(event) => { EmailCacheConfig.debug = event.currentTarget.checked; console.log(`[CHANGE] [EmailCacheConfig.debug]`, EmailCacheConfig.debug); this.forceUpdate(); }} />{`Debug Mode`}
              </Label>
            </FormGroup>

            <FormGroup row style={{ marginTop: 5 }}>
              <Label for="redirectDelay" sm={4}>{`Redirect Delay`}</Label>
              <Col sm={8}>
                <Input id="redirectDelay" type="number" bsSize="sm" style={{ marginTop: 5 }}
                  step="100" min="0" max="50000"
                  value={EmailCacheConfig.redirectDelay}
                  checked={EmailCacheConfig.redirectDelay}
                  onChange={(event) => { EmailCacheConfig.redirectDelay = parseInt(event.currentTarget.value); console.log(`[CHANGE] [EmailCacheConfig.redirectDelay]`, EmailCacheConfig.redirectDelay); this.forceUpdate(); }} />
              </Col>
            </FormGroup>

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
