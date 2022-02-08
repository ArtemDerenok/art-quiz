import Quiz from './quiz';
import QuizModel from './quizModel';

class QuizControler {
  static _instance;

  _questions;

  constructor() {
    if (QuizControler._instance) {
      return QuizControler._instance;
    }
    this._categoryName = '';
    this._body = document.body;
    QuizControler._instance = this;
  }

  _clearContainer() {
    this._body.innerHTML = '';
  }

  _handleAnswers() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.addEventListener('click', (event) => {
      if (event.target.closest('.card')) {
        new QuizModel().checkAnswer(event.target.closest('.card').dataset.answer);
      }
    });
  }

  async startQuiz(categoryName) {
    this._categoryName = categoryName;
    this._questions = await new QuizModel().getQuestions(this._categoryName);
    new QuizModel().resetStatistics();
    new Quiz(this._categoryName, this._questions).runQuiz();
    this._handleAnswers();
  }
}

export default QuizControler;
