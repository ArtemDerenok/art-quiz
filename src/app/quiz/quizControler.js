/* eslint-disable no-constructor-return */
import Quiz from './quiz';
import QuizModel from './quizModel';

class QuizControler {
  static _instance;

  _questions;

  constructor(categoryName) {
    if (QuizControler._instance) {
      return QuizControler._instance;
    }
    this._categoryName = categoryName;

    QuizControler._instance = this;
  }

  _handleAnswers() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.addEventListener('click', (event) => {
      if (event.target.closest('.card')) {
        new QuizModel().checkAnswer(event.target.closest('.card').dataset.answer);
      }
    });
  }

  async startQuiz() {
    this._questions = await new QuizModel().getQuestions();
    new Quiz(this._categoryName, this._questions).runQuiz();
    this._handleAnswers();
  }
}

export default QuizControler;
