import { Modal } from 'bootstrap';
import checkGameMode from '../../utils/checkGameMode';
import getRandomNum from '../../utils/getRandomNum';
import AnswerModalWindow from '../components/answerModalWindow';
import Question from './question';
import QuizModel from './quizModel';

class Quiz {
  _rightAnswer;

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

  _rednerHeader() {
    this._header.classList.add('container');
    if (checkGameMode() === 'artist') {
      this._heading = 'Who is the author of this picture?';
    } else {
      this._heading = 'What is the name of this picture?';
    }
    this._header.innerHTML = `<div class="row flex-row align-items-center justify-content-center p-2"><img src="logo.png" class="col-1 quiz-logo"></img><h3 class="col-6 text-center">${this._heading}</h3><div class="col-1"><img src="timer-picture.png" class="quiz-timer-logo"></img></div></div>`;
    return this._header;
  }

  _showAnswerModal(resultAnswer) {
    console.log(resultAnswer);
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

  _showFinishModalWindow(result) {
    console.log(`finish game. Result: ${result}`);
  }

  runQuiz() {
    this._renderQuestion();
    new QuizModel().subscribe(this);
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
