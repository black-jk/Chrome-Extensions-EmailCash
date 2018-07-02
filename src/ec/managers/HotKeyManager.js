// ====================================================================================================
// [HotKeyManager]
// ====================================================================================================
import KeyCode from 'keycode-js';
import { DelayTimer } from "../../lib/DelayTimer";
import { EventsDispatcher } from "../../lib/event/EventsDispatcher";
import { Tool } from '../../lib/Tool';

export class HotKeyManager extends EventsDispatcher {

  disable: Boolean = false;

  // ----------------------------------------------------------------------------------------------------

  constructor() {
    super();
    document.addEventListener("mousewheel", this._handleMouseWheel);
    document.addEventListener("DOMMouseScroll", this._handleMouseWheel);
    document.addEventListener("keydown", this._handleKeyDown);
  }



  // ----------------------------------------------------------------------------------------------------

  _handleMouseWheel = (event: WheelEvent) => {
    // console.log(`[HotKeyManager] [_handleMouseWheel]`, event);

    // [ctrl MouseWheel] prevent browse zoom (pc / mac)
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }
  }

  // ----------------------------------------------------------------------------------------------------

  _handleKeyDown = (event: KeyboardEvent) => {
    let keyCode: Number = event.keyCode;

    // [ctrl, alt, shift, caps, meta(left), meta(right)] skip
    if (([16, 17, 18, 20, 91, 93]).indexOf(keyCode) > -1) return;

    // console.log(`[HotKeyManager] [_handleKeyDown]`, keyCode, event);

    // [ctrl -/+] prevent prevent browse zoom (pc / mac)
    // if ((event.ctrlKey || event.metaKey) && (keyCode == 189 || keyCode == 187 || keyCode == 107 || keyCode == 109 || keyCode == 173 || keyCode == 61)) {
    //   event.preventDefault();
    // }

    if (this.disable) return;

    this._listeners.forEach((listener: CombinationListener, index: Number) => {
      listener.keyInput(event);
    });
  }

  // ----------------------------------------------------------------------------------------------------

  _listeners: Array = [

    new CombinationListener([38, 38, 40, 40, 37, 39, 37, 39, 66, 65], this, () => {
      let originCssText: String = document.body.style.cssText;
      document.body.style.cssText = "transform: scale(-1, 1) rotate(180deg);  transition: transform 1000ms;";
      new DelayTimer(this, () => {
        document.body.style.cssText = "transform: scale(1, 1) rotate(360deg);  transition: transform 1000ms;";
        new DelayTimer(this, () => {
          document.body.style.cssText = originCssText;
        }, [], 1000);
      }, [], 1500);
    }),

    new CombinationListener([`alt+${KeyCode.KEY_BACK_QUOTE}`, KeyCode.KEY_C], this, () => {
      console.clear();
    }),

    // new CombinationListener([`ctrl+shift+${KeyCode.KEY_DOWN}`, `ctrl+shift+${KeyCode.KEY_UP}`], this, () => {
    //   alert("XD");
    // }),

  ];

  // --------------------------------------------------

  registerListener(listener: CombinationListener) {
    let listeners: Array = this._listeners;
    if (listeners.indexOf(listener) < 0) {
      listeners.push(listener);
    }
  }

  // --------------------------------------------------

  unregisterListener(listener: CombinationListener) {
    let listeners: Array = this._listeners;
    Tool.removeFromArray(listeners, listener);
  }

};



// ====================================================================================================
// [CombinationListener]
// ====================================================================================================

export class CombinationListener {

  constructor(keys: Array, thisArg: Object, callback: Function, argArray: Array = [], debug: Boolean = false) {
    this._index = -1;
    this._keys = keys;

    this._thisArg = thisArg;
    this._callback = callback;
    this._argArray = argArray;

    this._debug = debug;
  }

  // ----------------------------------------------------------------------------------------------------

  _debug = false;

  _index: Number = -1;
  _keys: Array = [];

  _thisArg: Object = null;
  _callback: Function = null;
  _argArray: any = null;

  // ----------------------------------------------------------------------------------------------------

  keyInput(event: KeyboardEvent) {
    if (!this._keys || this._keys.length < 1) return;

    let keyCode: Number = event.keyCode;

    let match: Boolean = false;
    let nextKey: any = this._keys[this._index + 1];
    let value: any;

    if (typeof nextKey == "number") {
      value = keyCode;
      match = (value == this._keys[this._index + 1]);
    } else if (typeof nextKey == "string") {
      let patterns: Array = nextKey.split("+");
      let values: Array = [keyCode.toString()];
      if (event.altKey) values.push("alt");
      if (event.ctrlKey || event.metaKey) values.push("ctrl");
      if (event.shiftKey) values.push("shift");

      patterns.sort().reverse();
      values.sort().reverse();
      value = values.join("+");
      match = (patterns.join("+") == value);
    }

    if (match) {
      this._index++;
    } else {
      if (this._index > -1) {
        this._index = -1;
        this.keyInput(event);
      }
    }

    if (this._debug) {
      console.log(`[key: ${nextKey}] [value: ${value}] [match: ${match}] [index: ${this._index + 1} / ${this._keys.length}]`);
    }

    if (this._index + 1 == this._keys.length) {
      this._index = -1;

      let callback: Function = this._callback;
      callback.apply(this._thisArg, this._argArray);
    }
  }

}
