import { Modal } from 'bootstrap';
import SettingModel from '../models/settingModel';
import Quiz from './quiz';
import QuizModel from './quizModel';

class QuizControler {
  _questions;

  _quizInstance;

  _gameSettings;

  _categoryName;

  _myModal;

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

  _hideAnswerModal() {
    document.getElementById('myModal').addEventListener('click', (event) => {
      if (event.target.closest('#myModal') && !event.target.closest('.modal-dialog')) {
        this._quizInstance.deleteTimer();
        this._quizInstance.createTimer();
      }
      if (event.target.closest('#next-question-btn')) {
        this._myModal.hide();
        this._quizInstance.deleteTimer();
        this._quizInstance.createTimer();
      }
    });
  }

  _showAnswerModal() {
    this._myModal = new Modal(document.getElementById('myModal'));
    this._myModal.show();
    this._quizInstance.deleteTimer();
    this._hideAnswerModal();
  }

  update(action) {
    if (action === 'endTime') {
      new QuizModel().checkAnswer();
    } else if (action === 'showAnswerModal') {
      this._showAnswerModal();
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
