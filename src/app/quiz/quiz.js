import { Modal } from 'bootstrap';
import checkGameMode from '../../utils/checkGameMode';
import getRandomNum from '../../utils/getRandomNum';
import AnswerModalWindow from '../components/answerModalWindow';
import FinishGameModalWindow from '../components/finishGameModalWindow';
import Question from './question';
import QuizModel from './quizModel';

class Quiz {
  _rightAnswer;

  _timer;

  constructor(categoryName, questionsArr) {
    this._questions = questionsArr;
    this._categoryName = categoryName;
    this._main = document.createElement('div');
    this._body = document.body;
    this._header = document.createElement('div');
    this._main.classList.add('container', 'p-4');
    this._main.id = 'quiz-container';
    this._currentQuestion = 0;
    this._heading = '';
    this._wrongAnswers = [];
    this._gameSettings = JSON.parse(localStorage.getItem('settingsQuiz'));
    this._timerContainer = document.createElement('div');
    this._timerElement = document.createElement('span');
    this._timerCount = this._gameSettings.timer.time;
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
    if (checkGameMode() === 'artist') {
      this._rightAnswer = this._questions[this._currentQuestion].author;
    } else if (checkGameMode() === 'picture') {
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

  _renderTimer() {
    this._timerElement.classList.add('ps-1');
    if (this._gameSettings.timer.onTimer) {
      this._timerElement.textContent = `00:${
        this._timerCount < 10 ? `0${this._timerCount}` : this._timerCount
      }`;
    } else {
      this._timerElement.textContent = '00:00';
    }
    this._timerContainer.append(this._timerElement);
  }

  _rednerHeader() {
    this._header.classList.add('container');
    if (checkGameMode() === 'artist') {
      this._heading = 'Who is the author of this picture?';
    } else {
      this._heading = 'What is the name of this picture?';
    }
    this._header.innerHTML = `<div class="row flex-row align-items-center justify-content-center p-2"><img src="logo.png" class="col-1 quiz-logo"></img><h3 class="col-6 text-center">${this._heading}</h3></div>`;
    this._timerContainer.classList.add('col-1', 'd-flex', 'align-items-center');
    this._timerContainer.innerHTML = `<img src="timer-picture.png" class="quiz-timer-logo"></img>`;
    this._renderTimer();
    this._header.firstElementChild.append(this._timerContainer);
    return this._header;
  }

  _showAnswerModal(resultAnswer) {
    this._main.append(
      new AnswerModalWindow(this._questions[this._currentQuestion - 2], resultAnswer).render()
    );
    const myModal = new Modal(document.getElementById('myModal'));
    myModal.show();
  }

  _nextQuestion() {
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
    console.log(this._rightAnswer);
    this._currentQuestion += 1;
  }

  _renderQuestion() {
    this._body.append(this._rednerHeader());
    this._nextQuestion();
  }

  _showFinishModalWindow(resultAnswers) {
    this._clearContainer();
    console.log(`finish game. Result: ${resultAnswers}`);
    this._main.append(new FinishGameModalWindow(resultAnswers).render());
    const myModal = new Modal(document.getElementById('myModalFinish'));
    myModal.show();
  }

  _getGameSettings() {
    this._gameSettings = JSON.parse(localStorage.getItem('settingsQuiz'));
  }

  _createTimer() {
    this._timerCount = this._gameSettings.timer.time;
    const run = () => {
      setTimeout(() => {
        if (this._timerCount > 0) {
          this._timerCount -= 1;
          this._renderTimer();
          console.log(this._timerCount);
          run();
        }
      }, 1000);
    };

    if (this._gameSettings.timer.onTimer) {
      run();
    }
  }

  runQuiz() {
    this._renderQuestion();
    new QuizModel().subscribe(this);
    return this._createTimer();
  }

  update({ action, result }) {
    if (action === 'nextQuestion') {
      this._nextQuestion(result);
      this._showAnswerModal(result);
    }
    if (action === 'finishGame') {
      this._showFinishModalWindow(result);
      new QuizModel().unsubscribe(this);
    }
  }
}

export default Quiz;
