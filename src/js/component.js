
export default class Component {
  constructor({ element }) {
    this._element = element;
    this.callbackMap = {};
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
    this.callbackMap[eventName] = callback;
  }

  emit(eventName, data) {
    this.callbackMap[eventName](data);
  }
}
