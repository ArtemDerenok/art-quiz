import checkGameMode from '../../utils/checkGameMode';
import getRandomNum from '../../utils/getRandomNum';
import getQuestions from '../api/api';
import CategoryStatistics from '../statistics/categoryStatistics';

class QuizModel {
  static _instance;

  constructor() {
    if (QuizModel._instance) {
      return QuizModel._instance;
    }
    this._categoryName = '';
    this._observers = [];
    this._questions = [];
    this._currentQuestion = 0;
    this._tottalRightAnswers = 0;
    QuizModel._instance = this;
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  _emit(action) {
    this._observers.forEach((obs) => obs.update(action));
  }

  _updateStatistics(gameMode) {
    if (gameMode === 'artist') {
      new CategoryStatistics().statistics[this._categoryName].countArtistMode += 1;
    } else {
      new CategoryStatistics().statistics[this._categoryName].countPictureMode += 1;
    }
    this._tottalRightAnswers += 1;
  }

  resetStatistics() {
    if (checkGameMode() === 'artist') {
      new CategoryStatistics().statistics[this._categoryName].countArtistMode = 0;
    } else {
      new CategoryStatistics().statistics[this._categoryName].countPictureMode = 0;
    }
  }

  _finishGame() {
    this._emit({ action: 'finishGame', result: this._tottalRightAnswers });
    new CategoryStatistics().updateLocalStorage();
    this._currentQuestion = 0;
    this._tottalRightAnswers = 0;
  }

  checkAnswer(answer) {
    if (checkGameMode() === 'artist') {
      if (answer === this._questions[this._currentQuestion].author) {
        if (this._currentQuestion === 9) {
          this._updateStatistics('artist');
          this._finishGame();
        } else {
          this._updateStatistics('artist');
          this._emit({ action: 'nextQuestion', result: true });
          this._currentQuestion += 1;
        }
      } else if (this._currentQuestion === 9) {
        this._finishGame();
      } else {
        this._emit({ action: 'nextQuestion', result: false });
        this._currentQuestion += 1;
      }
    } else if (checkGameMode() === 'picture') {
      if (answer === this._questions[this._currentQuestion].name) {
        if (this._currentQuestion === 9) {
          this._updateStatistics('picture');
          this._updateStatistics();
          this._finishGame();
        } else {
          this._updateStatistics('picture');
          this._emit({ action: 'nextQuestion', result: true });
          this._currentQuestion += 1;
        }
      } else if (this._currentQuestion === 9) {
        this._finishGame();
      } else {
        this._emit({ action: 'nextQuestion', result: false });
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
    this._questions = [];
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

  async getQuestions(categoryName) {
    this._categoryName = categoryName;
    const questions = await getQuestions();
    this._createArrayQuestions(questions);
    return this._questions;
  }
}

export default QuizModel;
