import ModalWindow from '../templates/modalWindow';
import Button from './button';

class AnswerModalWindow extends ModalWindow {
  constructor(answer, result) {
    super();
    this._answer = answer;
    this._button = new Button('simple-btn', 'next-button', 'next').render();
    this._container.id = 'myModal';
    this._pictureImage = document.createElement('img');
    this._resultLogo = document.createElement('img');
    this._button.id = 'next-question-btn';
    this._resultAnswer = result;
  }

  _createHeader() {
    if (this._resultAnswer) {
      this._resultLogo.src = 'correct-answer.png';
    } else {
      this._resultLogo.src = 'wrong-answer.png';
    }
    this._modalHeader.append(this._resultLogo);
    return this._modalHeader;
  }

  _createMainContent() {
    this._modalDialog.append(this._modalContent);
    this._pictureImage.classList.add('img-fluid', 'rounded-3', 'shadow');
    this._pictureImage.src = `https://raw.githubusercontent.com/ArtemDerenok/image-data/master/img/${this._answer.imageNum}.jpg`;
    this._modalBody.append(this._pictureImage);
    this._modalBody.innerHTML += `<p>${this._answer.name}</p><p>${this._answer.author}</p><p>${this._answer.year}</p>`;
    this._modalFooter.append(this._button);
    this._modalContent.append(this._createHeader());
    this._modalContent.append(this._modalBody);
    this._modalContent.append(this._modalFooter);
  }
}

export default AnswerModalWindow;
