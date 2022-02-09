import { categoriesDataArr } from './data/categoriesData';
import CategoryPage from './pages/categoryPage';
import MainPage from './pages/mainPage';
import SettingPage from './pages/settingPage';
import QuizControler from './quiz/quizControler';
import CategoryStatistics from './statistics/categoryStatistics';

class App {
  constructor() {
    this._body = document.body;
    this._categoryNumber = 0;
  }

  _clearContainer() {
    this._body.innerHTML = '';
  }

  _openSettengs() {
    const settingsBtn = document.getElementById('setting-button');
    settingsBtn.addEventListener('click', () => {
      this._clearContainer();
      this._body.append(new SettingPage('settings-page').render());
    });
  }

  static setGameMode(mode) {
    localStorage.setItem('gameModeQuiz', mode);
  }

  _handleFinishQuizButtons() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.addEventListener('click', (event) => {
      if (event.target.closest('#home-button') || event.target.closest('#myModalFinish')) {
        this._clearContainer();
        this._body.append(new MainPage('main-page').render());
        this._openSettengs();
        this._openCategory();
      }
      if (event.target.closest('#next-quiz-button')) {
        this._clearContainer();
        this._body.append(new CategoryPage('category-page').render());
        this._handleCategoryNavButton();
        this._handleQuizStart();
      }
      if (event.target.closest('#yes-button')) {
        this._clearContainer();
        new QuizControler()
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
        this._openSettengs();
        this._openCategory();
      }
    });
  }

  runApp() {
    this._body.append(new MainPage('main-page').render());
    this._openSettengs();
    this._openCategory();
    new CategoryStatistics().setLocalStorage();
  }
}

export default App;
