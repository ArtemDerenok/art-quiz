import SettingModel from '../models/settingModel';
import Quiz from './quiz';
import QuizModel from './quizModel';

class QuizControler {
  _questions;

  _quizInstance;

  _gameSettings;

  _categoryName;

  constructor() {
    this._body = document.body;
  }

  get quizInstance() {
    return this._quizInstance;
  }

  _clearContainer() {
    this._body.innerHTML = '';
  }

  _handleAnswers() {
    this._quizInstance.mainContainer.addEventListener('click', (event) => {
      if (event.target.closest('.card')) {
        new QuizModel().checkAnswer(event.target.closest('.card').dataset.answer);
      }
    });
  }

  update(action) {
    if (action === 'endTime') {
      console.log('Время вышло');
    }
  }

  async startQuiz(categoryName) {
    this._gameSettings = new SettingModel().getLocalStorage();
    this._categoryName = categoryName;
    this._questions = await new QuizModel().getQuestions(this._categoryName);
    new QuizModel().resetStatistics();
    this._quizInstance = new Quiz(this._categoryName, this._questions).renderQuiz();
    this._quizInstance.subscribe(this);
    this._handleAnswers();
    return this;
  }
}

export default QuizControler;
