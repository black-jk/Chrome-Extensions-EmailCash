// ====================================================================================================
// [EventsDispatcher]
// ====================================================================================================

export class EventsDispatcher {

  // ----------------------------------------------------------------------------------------------------

  _eventsMap: Map = new Map;

  _contextMap: Map = new Map;

  // --------------------------------------------------

  on(eventName: String, listener: Function, context: Object) {
    let _eventsMap: Map = this._eventsMap;
    let listeners: Array = _eventsMap.get(eventName);
    if (!listeners) {
      _eventsMap.set(eventName, [listener]);
    } else if (listeners.indexOf(listener) < 0) {
      listeners.push(listener);
    }

    this._contextMap.set(listener, context ? context : window || global || this);
  }

  // ----------------------------------------------------------------------------------------------------

  off(eventName: String, listener: Function) {
    let _eventsMap: Map = this._eventsMap;
    let listeners: Array = _eventsMap.get(eventName);
    if (!listeners || listeners.length == 0) return;

    let index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }

    this._contextMap.delete(listener);
  }

  // ----------------------------------------------------------------------------------------------------

  trigger(eventName: String /*, arg1, arg2, ...*/) {
    let _eventsMap: Map = this._eventsMap;
    let listeners: Array = _eventsMap.get(eventName);
    if (!listeners || listeners.length == 0) return;

    let callbackArgs: Array = [];
    if (arguments.length > 1) {
      for (let i = 1; i < arguments.length; i++) {
        callbackArgs.push(arguments[i]);
      }
    }

    listeners.forEach((listener: Function) => {
      listener.apply(this._contextMap.get(listener), [listener, ...callbackArgs]);
    });
  }

};
