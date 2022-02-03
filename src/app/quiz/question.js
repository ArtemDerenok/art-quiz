import getRandomNum from '../../utils/getRandomNum';

class Question {
  _rightAnswer;

  _wrongAnwser;

  constructor(srcImage, authorName, name, year, wrongAnswers) {
    this._src = `https://raw.githubusercontent.com/ArtemDerenok/image-data/master/img/${srcImage}.jpg`;
    this._authorName = authorName;
    this._pictureName = name;
    this._yearCreation = year;
    this._wrongAnswers = wrongAnswers;
    this._container = document.createElement('div');
    this._answersContainer = document.createElement('div');
    this._image = document.createElement('img');
    this._rightAnswerPositionNumber = getRandomNum(0, 3);
  }

  _setRightAndWrongAnswers() {
    if (localStorage.getItem('gameModeQuiz') === 'artist-category') {
      this._rightAnswer = this._authorName;
      this._wrongAnwser = 'author';
    } else if (localStorage.getItem('gameModeQuiz') === 'pictures-category') {
      this._rightAnswer = this._pictureName;
      this._wrongAnwser = 'name';
    }
  }

  _createMainContent() {
    this._container.classList.add('container', 'd-flex', 'flex-column', 'align-items-center');
    this._image.src = this._src;
    this._image.classList.add('img-fluid');
    this._container.append(this._image);
    this._answersContainer.classList.add('row', 'row-cols-2', 'w-50', 'pt-5');
    this._answersContainer.id = 'answers-container';

    for (let i = 0; i < 4; i += 1) {
      if (i === this._rightAnswerPositionNumber) {
        this._answersContainer.innerHTML += `<div class="card col" data-answer="${this._rightAnswer}"><div class="card-body"><h5 class="card-title">${this._rightAnswer}</h5></div>`;
      }
      if (i !== 3) {
        this._answersContainer.innerHTML += `<div class="card col" data-answer="${
          this._wrongAnswers[i][this._wrongAnwser]
        }"><div class="card-body"><h5 class="card-title">${
          this._wrongAnswers[i][this._wrongAnwser]
        }</h5></div>`;
      }
    }

    this._container.append(this._answersContainer);
    return this._container;
  }

  render() {
    this._setRightAndWrongAnswers();
    return this._createMainContent();
  }
}

export default Question;
