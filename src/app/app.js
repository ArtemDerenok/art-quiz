import CategoryPage from './pages/categoryPage';
import MainPage from './pages/mainPage';
import SettingPage from './pages/settingPage';
import Quiz from './quiz/quiz';
import CategoryStatistics from './statistics/categoryStatistics';

class App {
  constructor() {
    this._body = document.body;
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

  _handleQuizStart() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.addEventListener('click', (event) => {
      if (event.target.closest('div[data-title]')) {
        App.clearContainer();
        new Quiz(event.target.closest('div[data-title]').dataset.title).runQuiz();
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
