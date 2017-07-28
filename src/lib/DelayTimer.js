// ====================================================================================================
// [DelayTimer]
// ====================================================================================================

export class DelayTimer {

  timeoutId = 0;

  thisObject = null;
  argsArray = [];
  callback = null;
  delay = 0;

  // --------------------------------------------------

  constructor(thisObject, callback, argsArray, delay = 0) {
    this.thisObject = thisObject;
    this.argsArray = argsArray;
    this.callback = callback;
    this.setDelay(delay);
  }

  // --------------------------------------------------

  _onTimeUp() {
    this.cancel();
    this.callback.apply(this.thisObject, this.argsArray);
  }



  // --------------------------------------------------
  // [Public Methods]
  // --------------------------------------------------

  setDelay(delay) {
    this.cancel();
    this.delay = delay;

    if (delay > 0) {
      this.timeoutId = setTimeout(() => { this._onTimeUp(); }, delay);
      return true;
    }
    return false;
  }

  // --------------------------------------------------

  cancel() {
    if (this.timeoutId > 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = 0;
    }
  }

  // --------------------------------------------------

  triggerNow() {
    this._onTimeUp();
  }

  // --------------------------------------------------

};
