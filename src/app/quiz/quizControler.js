import { Modal } from 'bootstrap';
import ClickAudio from '../components/audioPlayer/clickAudio';
import CorrectAnswerAuido from '../components/audioPlayer/correctAnswerAudio';
import WrongAnswerAudio from '../components/audioPlayer/wrongAnswerAudio';
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

        if (this._gameSettings.sound.onSound) {
          new ClickAudio().playAudio();
        }
      }
      if (event.target.closest('#next-question-btn')) {
        this._myModal.hide();

        if (this._gameSettings.sound.onSound) {
          new ClickAudio().playAudio();
        }

        this._quizInstance.deleteTimer();
        this._quizInstance.createTimer();
      }
    });
  }

  _showAnswerModal(resultAnswer) {
    this._myModal = new Modal(document.getElementById('myModal'));
    this._myModal.show();

    if (this._gameSettings.sound.onSound) {
      if (resultAnswer) {
        new CorrectAnswerAuido().playAudio();
      } else {
        new WrongAnswerAudio().playAudio();
      }
    }

    this._quizInstance.deleteTimer();
    this._hideAnswerModal();
  }

  update(action, resultAnswer) {
    if (action === 'endTime') {
      new QuizModel().checkAnswer();
    } else if (action === 'showAnswerModal') {
      this._showAnswerModal(resultAnswer);
    }
  }

  async startQuiz(categoryName) {
    this._gameSettings = new SettingModel().settings;
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
