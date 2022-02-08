import ModalWindow from '../templates/modalWindow';
import Button from './button';

class FinishGameModalWindow extends ModalWindow {
  constructor(result) {
    super();
    this._resultGame = result;
    this._container.id = 'myModal';
    this._count = document.createElement('div');
    this._goodResultImage = document.createElement('img');
    this._homeButton = new Button('home-btn', 'home-button', 'home').render();
    this._homeButton.setAttribute('data-bs-dismiss', 'modal');
    this._nextQuizButton = new Button('simple-btn', 'next-quiz-button', 'next quiz').render();
  }

  _renderNormalResult() {
    this._modalHeader.textContent = 'CONGRATULATIONS !';
    this._count.textContent = `${this._resultGame}/10`;
    this._goodResultImage.src = 'good-job.png';
    this._goodResultImage.classList.add('img-fluid');
    this._modalBody.append(this._count);
    this._modalBody.append(this._goodResultImage);
    this._modalFooter.append(this._homeButton);
    this._modalFooter.append(this._nextQuizButton);
    this._modalContent.append(this._modalHeader);
    this._modalContent.append(this._modalBody);
    this._modalContent.append(this._modalFooter);
    return this._modalContent;
  }

  _renderGrandResult() {}

  _renderBadResult() {}

  _createMainContent() {
    this._modalDialog.append(this._renderNormalResult());
  }
}

export default FinishGameModalWindow;
