/* eslint-disable no-constructor-return */
import getRandomNum from '../../utils/getRandomNum';
import getQuestions from '../api/api';

class QuizModel {
  static _instance;

  constructor() {
    if (QuizModel._instance) {
      return QuizModel._instance;
    }
    this._questions = [];
    QuizModel._instance = this;
  }

  checkAnswer(answer, rightAnswer) {
    if (answer === rightAnswer) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
  }

  _isQuestion(elem) {
    const index = this._questions.indexOf(elem);
    if (index >= 0) {
      return true;
    }
    return false;
  }

  async getQuestions() {
    const questions = await getQuestions();
    for (let i = 0; i < 10; i += 1) {
      let randomNumber = getRandomNum(0, questions.length - 1);
      if (this._isQuestion(questions[randomNumber])) {
        i -= 1;
        randomNumber = getRandomNum(0, questions.length - 1);
      } else {
        this._questions.push(questions[randomNumber]);
      }
    }
    return this._questions;
  }
}

export default QuizModel;
