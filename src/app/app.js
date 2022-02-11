import { categoriesDataArr } from './data/categoriesData';
import SettingModel from './models/settingModel';
import CategoryPage from './pages/categoryPage';
import MainPage from './pages/mainPage';
import SettingPage from './pages/settingPage';
import QuizControler from './quiz/quizControler';
import CategoryStatistics from './statistics/categoryStatistics';

class App {
  _quizControlerInstance;

  constructor() {
    this._body = document.body;
    this._categoryNumber = 0;
  }

  _clearContainer() {
    this._body.innerHTML = '';
  }

  _openSettings() {
    const settingsBtn = document.getElementById('setting-button');
    settingsBtn.addEventListener('click', () => {
      this._clearContainer();
      this._body.append(new SettingPage('settings-page').render());
      this._handleSettings();
    });
  }

  static setGameMode(mode) {
    localStorage.setItem('gameModeQuiz', mode);
  }

  _handleFinishQuizButtons() {
    this._quizControlerInstance.quizInstance.mainContainer.addEventListener('click', (event) => {
      if (event.target.closest('#home-button') || event.target.closest('#myModalFinish')) {
        this._quizControlerInstance.quizInstance.unsubscribe(this._quizControlerInstance);
        this._clearContainer();
        this._body.append(new MainPage('main-page').render());
        this._openSettings();
        this._openCategory();
      }
      if (event.target.closest('#next-quiz-button')) {
        this._quizControlerInstance.quizInstance.unsubscribe(this._quizControlerInstance);
        this._clearContainer();
        this._body.append(new CategoryPage('category-page').render());
        this._handleCategoryNavButton();
        this._handleQuizStart();
      }
      if (event.target.closest('#yes-button')) {
        this._quizControlerInstance.quizInstance.unsubscribe(this._quizControlerInstance);
        this._clearContainer();
        this._quizControlerInstance
          .startQuiz(categoriesDataArr[this._categoryNumber])
          .then(() => this._handleFinishQuizButtons());
      }
    });
  }

  _handleQuizStart() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.addEventListener('click', (event) => {
      if (event.target.closest('div[data-title]')) {
        this._categoryNumber = +event.target.closest('div[data-title]').dataset.title;
        this._clearContainer();
        new QuizControler()
          .startQuiz(categoriesDataArr[this._categoryNumber])
          .then((obj) => {
            this._quizControlerInstance = obj;
          })
          .then(() => this._handleFinishQuizButtons());
      }
    });
  }

  _openCategory() {
    const categoryBtns = document.getElementById('category-btns');
    categoryBtns.addEventListener('click', (event) => {
      if (event.target.closest('div[id]')) {
        App.setGameMode(event.target.closest('div[id]').id);
        this._clearContainer();
        this._body.append(new CategoryPage('category-page').render());
        this._handleCategoryNavButton();
        this._handleQuizStart();
      }
    });
  }

  _handleCategoryNavButton() {
    const heading = document.getElementById('category-heading');
    heading.addEventListener('click', (event) => {
      if (event.target.id === 'home-button') {
        this._clearContainer();
        this._body.append(new MainPage('main-page').render());
        this._openSettings();
        this._openCategory();
      }
    });
  }

  _handleSettings() {
    const settingsButtons = document.getElementById('settings-buttons-container');
    const soundCheckbox = document.getElementById('checkbox-volume');
    const timerCheckbox = document.getElementById('checkbox-timer');
    const inputSound = document.getElementById('input-sound-value');
    const inputTime = document.getElementById('input-time-value');

    settingsButtons.addEventListener('click', (event) => {
      if (event.target.closest('#save-button')) {
        new SettingModel().settings = [
          soundCheckbox.checked,
          inputSound.valueAsNumber,
          timerCheckbox.checked,
          inputTime.valueAsNumber,
        ];
        this._clearContainer();
        this._body.append(new MainPage('main-page').render());
        this._openSettings();
        this._openCategory();
      }
      if (event.target.closest('#default-button')) {
        new SettingModel().settings = [];
        this._clearContainer();
        this._body.append(new SettingPage('settings-page').render());
        this._handleSettings();
      }
    });
  }

  runApp() {
    this._body.append(new MainPage('main-page').render());
    new SettingModel().checkLocalStorage();
    this._openSettings();
    this._openCategory();
    new CategoryStatistics().setLocalStorage();
  }
}

export default App;
