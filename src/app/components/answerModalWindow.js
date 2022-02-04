import ModalWindow from '../templates/modalWindow';
import Button from './button';

class AnswerModalWindow extends ModalWindow {
  constructor(answer) {
    super();
    this._answer = answer;
    this._button = new Button('simple-btn', 'next-button', 'next').render();
    this._container.id = 'myModal';
  }

  _createMainContent() {
    this._modalDialog.append(this._modalContent);
    this._modalBody.innerHTML = '<p>Здесь идет основной текст модального окна</p>';
    this._modalFooter.append(this._button);
    this._modalContent.append(this._modalBody);
    this._modalContent.append(this._modalFooter);
    console.log(this._answer);
  }
}

export default AnswerModalWindow;
