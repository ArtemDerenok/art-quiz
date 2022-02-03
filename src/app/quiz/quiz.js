/* eslint-disable no-continue */
import getRandomNum from '../../utils/getRandomNum';
import Question from './question';

class Quiz {
  _rightAnswer;

  constructor(categoryName, questionsArr) {
    this._questions = questionsArr;
    this._categoryName = categoryName;
    this._main = document.createElement('div');
    this._body = document.body;
    this._header = document.createElement('div');
    this._main.classList.add('container');
    this._main.id = 'quiz-container';
    this._currentQuestion = 0;
    this._wrongAnswers = [];
  }

  _clearContainer() {
    this._main.innerHTML = '';
  }

  _isQuestion(elem) {
    const index = this._wrongAnswers.indexOf(elem);
    if (index >= 0) {
      return true;
    }
    return false;
  }

  _setRightAnswer() {
    if (localStorage.getItem('gameModeQuiz') === 'artist-category') {
      this._rightAnswer = this._questions[this._currentQuestion].author;
    } else if (localStorage.getItem('gameModeQuiz') === 'pictures-category') {
      this._rightAnswer = this._questions[this._currentQuestion].name;
    }
  }

  _getWrongAnswers() {
    while (this._wrongAnswers.length !== 3) {
      const randomNum = getRandomNum(0, 9);
      if (randomNum === this._currentQuestion || this._isQuestion(this._questions[randomNum])) {
        continue;
      }
      this._wrongAnswers.push(this._questions[randomNum]);
    }
  }

  _rednerHeader() {
    this._header.classList.add('container');
    this._header.innerHTML = `<div class="row"><img src="logo.png" class="col quiz-logo"></img><h3 class="col">Who is the author of this picture?</h3><div class="col"><img src="timer-picture.png" class="quiz-timer-logo"></img></div></div>`;
    return this._header;
  }

  _renderQuestion() {
    this._getWrongAnswers();
    this._main.append(
      new Question(
        this._questions[this._currentQuestion].imageNum,
        this._questions[this._currentQuestion].author,
        this._questions[this._currentQuestion].name,
        this._questions[this._currentQuestion].year,
        this._wrongAnswers
      ).render()
    );
    this._body.append(this._rednerHeader());
    this._body.append(this._main);
    this._wrongAnswers = [];
    this._setRightAnswer();
    this._currentQuestion += 1;
  }

  _nexQuestion() {
    this._clearContainer();
    this._getWrongAnswers();
    this._main.append(
      new Question(
        this._questions[this._currentQuestion].imageNum,
        this._questions[this._currentQuestion].author,
        this._questions[this._currentQuestion].name,
        this._questions[this._currentQuestion].year,
        this._wrongAnswers
      ).render()
    );
    this._body.append(this._main);
    this._wrongAnswers = [];
    this._setRightAnswer();
    this._currentQuestion += 1;
  }

  handleNexQuestion() {
    const elem = document.querySelector('.quiz-logo');
    elem.addEventListener('click', () => {
      this._nexQuestion();
    });
  }

  runQuiz() {
    this._renderQuestion();
    this.handleNexQuestion();
    return this._rightAnswer;
  }
}

export default Quiz;
