import ModalWindow from '../templates/modalWindow';
import Button from './button';

class FinishGameModalWindow extends ModalWindow {
  constructor(result) {
    super();
    this._resultGame = result;
    this._container.id = 'myModalFinish';
    this._count = document.createElement('div');
    this._resultImage = document.createElement('img');
    this._homeButton = new Button('home-btn', 'home-button', 'home').render();
    this._homeButton.setAttribute('data-bs-dismiss', 'modal');
    this._nextQuizButton = new Button('simple-btn', 'next-quiz-button', 'next quiz').render();
    this._nextQuizButton.setAttribute('data-bs-dismiss', 'modal');
    this._yesButton = new Button('simple-btn', 'yes-button', 'yes').render();
    this._yesButton.setAttribute('data-bs-dismiss', 'modal');
    this._noButton = new Button('simple-btn', 'home-button', 'no').render();
    this._noButton.setAttribute('data-bs-dismiss', 'modal');
  }

  _renderNormalResult() {
    this._modalHeader.textContent = 'CONGRATULATIONS !';
    this._count.textContent = `${this._resultGame}/10`;
    this._resultImage.src = 'good-job.png';
    this._resultImage.classList.add('img-fluid');
    this._modalBody.append(this._count);
    this._modalBody.append(this._resultImage);
    this._modalFooter.append(this._homeButton);
    this._modalFooter.append(this._nextQuizButton);
    this._modalContent.append(this._modalHeader);
    this._modalContent.append(this._modalBody);
    this._modalContent.append(this._modalFooter);
    return this._modalContent;
  }

  _renderGrandResult() {
    this._resultImage.src = 'stars.png';
    this._resultImage.classList.add('img-fluid');
    this._resultImage.style.maxWidth = '300px';
    this._modalBody.append(this._resultImage);
    this._modalBody.innerHTML += '<h3>Grand result</h3><h4>Congratulations!</h4>';
    this._modalFooter.append(this._homeButton);
    this._modalContent.append(this._modalBody);
    this._modalContent.append(this._modalFooter);
    return this._modalContent;
  }

  _renderBadResult() {
    this._resultImage.src = 'game-over.png';
    this._resultImage.classList.add('img-fluid');
    this._modalBody.innerHTML = '<h2>GAME OVER</h2>';
    this._modalBody.append(this._resultImage);
    this._modalBody.innerHTML += '<h4>Play again?</h4>';
    this._modalFooter.append(this._yesButton);
    this._modalFooter.append(this._noButton);
    this._modalContent.append(this._modalBody);
    this._modalBody.append(this._modalFooter);
    return this._modalContent;
  }

  _createMainContent() {
    if (this._resultGame >= 5 && this._resultGame < 10) {
      this._modalDialog.append(this._renderNormalResult());
    } else if (this._resultGame === 10) {
      this._modalDialog.append(this._renderGrandResult());
    } else if (this._resultGame < 5) {
      this._modalDialog.append(this._renderBadResult());
    }
  }
}

export default FinishGameModalWindow;
