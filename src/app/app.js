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

  static clearContainer() {
    const container = document.querySelector('.container');
    container.remove();
  }

  _openSettengs() {
    const settingsBtn = document.getElementById('setting-button');
    settingsBtn.addEventListener('click', () => {
      App.clearContainer();
      this._body.append(new SettingPage('settings-page').render());
    });
  }

  static setGameMode(mode) {
    localStorage.setItem('gameModeQuiz', mode);
  }

  _handleFinishQuizButtons() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.addEventListener('click', (event) => {
      if (event.target.closest('#home-button')) {
        this._body.innerHTML = '';
        this._body.append(new MainPage('main-page').render());
        this._openSettengs();
        this._openCategory();
      }
      if (event.target.closest('#next-quiz-button')) {
        this._categoryNumber += 1;
        this._body.innerHTML = '';
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
        App.clearContainer();
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
        App.clearContainer();
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
        App.clearContainer();
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
