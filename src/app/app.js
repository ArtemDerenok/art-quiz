import CategoryPage from './pages/categoryPage';
import MainPage from './pages/mainPage';
import SettingPage from './pages/settingPage';
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

  _openCategory() {
    const categoryBtns = document.getElementById('category-btns');
    categoryBtns.addEventListener('click', (event) => {
      if (event.target.closest('div[id]')) {
        App.clearContainer();
        this._body.append(
          new CategoryPage('category-page', event.target.closest('div[id]').id).render()
        );
        this._handleCategoryNavButton();
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
