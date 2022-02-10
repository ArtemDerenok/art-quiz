import Quiz from './quiz';
import QuizModel from './quizModel';

class QuizControler {
  static _instance;

  _questions;

  _timer;

  _gameSettings;

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

  _getGameSettings() {
    this._gameSettings = JSON.parse(localStorage.getItem('settingsQuiz'));
  }

  async startQuiz(categoryName) {
    this._getGameSettings();
    this._categoryName = categoryName;
    this._questions = await new QuizModel().getQuestions(this._categoryName);
    new QuizModel().resetStatistics();
    this._timer = new Quiz(this._categoryName, this._questions).runQuiz();
    this._handleAnswers();
    console.log(this._timer);
  }
}

export default QuizControler;
