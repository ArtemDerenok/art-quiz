class Button {
  constructor(className, idButton, textContent) {
    this._button = document.createElement('button');
    this._className = className;
    this._id = idButton;
    this._button.classList.add(this._className);
    this._button.id = this._id;
    this._textContent = textContent;
    this._button.textContent = this._textContent;
  }

  get className() {
    return this._className;
  }

  get id() {
    return this._id;
  }

  render() {
    return this._button;
  }
}

export default Button;
