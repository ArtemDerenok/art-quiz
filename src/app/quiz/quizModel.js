/* eslint-disable no-constructor-return */
import getRandomNum from '../../utils/getRandomNum';
import getQuestions from '../api/api';

class QuizModel {
  static _instance;

  constructor() {
    if (QuizModel._instance) {
      return QuizModel._instance;
    }
    this._observers = [];
    this._questions = [];
    this._currentQuestion = 0;
    QuizModel._instance = this;
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  emit(action) {
    this._observers.forEach((obs) => obs.update(action));
  }

  checkAnswer(answer) {
    if (localStorage.getItem('gameModeQuiz') === 'artist-category') {
      if (answer === this._questions[this._currentQuestion].author) {
        console.log('Correct');
        this.emit('nextQuestion');
        this._currentQuestion += 1;
      } else {
        console.log('Incorrect');
        this.emit('nextQuestion');
        this._currentQuestion += 1;
      }
    } else if (localStorage.getItem('gameModeQuiz') === 'pictures-category') {
      if (answer === this._questions[this._currentQuestion].name) {
        console.log('Correct');
        this.emit('nextQuestion');
        this._currentQuestion += 1;
      } else {
        console.log('Incorrect');
        this.emit('nextQuestion');
        this._currentQuestion += 1;
      }
    }
  }

  _isQuestion(elem) {
    const index = this._questions.indexOf(elem);
    if (index >= 0) {
      return true;
    }
    return false;
  }

  _filterQuestion(obj) {
    return this._questions.find((elem) => elem.author === obj.author);
  }

  _createArrayQuestions(questions) {
    for (let i = 0; i < 10; i += 1) {
      let randomNumber = getRandomNum(0, questions.length - 1);
      if (
        this._isQuestion(questions[randomNumber]) ||
        this._filterQuestion(questions[randomNumber])
      ) {
        i -= 1;
        randomNumber = getRandomNum(0, questions.length - 1);
      } else {
        this._questions.push(questions[randomNumber]);
      }
    }
  }

  async getQuestions() {
    const questions = await getQuestions();
    this._createArrayQuestions(questions);
    return this._questions;
  }
}

export default QuizModel;
