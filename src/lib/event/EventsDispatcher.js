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

  trigger(eventName: String, args: Object = {}) {
    let _eventsMap: Map = this._eventsMap;
    let listeners: Array = _eventsMap.get(eventName);
    if (!listeners || listeners.length == 0) return;

    listeners.forEach((listener: Function) => {
      let event: JEvent = new JEvent(eventName, this, listener, args);
      listener.apply(this._contextMap.get(listener), [event]);
    });
  }

};



// ====================================================================================================

export class JEvent {

  _eventName: String;
  _currentTarget: EventsDispatcher;
  _listener: Function;
  _args: Object = {};

  // ----------------------------------------------------------------------------------------------------

  constructor(eventName: String, currentTarget: EventsDispatcher, listener: Function, args: Object) {
    this._eventName = eventName;
    this._currentTarget = currentTarget;
    this._listener = listener;
    this._args = args;
  }

  // ----------------------------------------------------------------------------------------------------

  get eventName(): String {
    return this._eventName;
  }

  get currentTarget(): EventsDispatcher {
    return this._currentTarget;
  }

  get listener(): Function {
    return this._listener;
  }

  get args(): Object {
    return this._args;
  }



  // ----------------------------------------------------------------------------------------------------

  off() {
    let eventName: String = this.eventName;
    let currentTarget: EventsDispatcher = this.currentTarget;
    let listener: Function = this.listener;
    currentTarget.off(eventName, listener);
  }

};
