
export default class Component {
  constructor({ element }) {
    this._element = element;
    this._callbackMap = {};
    this._props = {};
    this._state = {};
  }

  hide() {
    this._element.style.display = 'none';
  }

  show() {
    this._element.style.display = 'flex';
  }

  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${elementName}"]`);
      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }
      callback(event);
    });
  }

  subscribe(eventName, callback) {
    this._callbackMap[eventName] = callback;
  }

  emit(eventName, data) {
    this._callbackMap[eventName](data);
  }

  setProps(newProps) {
    this._props = {
      ...this._props,
      ...newProps,
    };

    this._updateView(this._props, this._state);
  }

  _setState(newState) {
    this._state = {
      ...this._state,
      ...newState,
    };

    this._updateView(this._props, this._state);
  }

  _updateView() {
    console.warn('Please implement _updateView');
  }
}
