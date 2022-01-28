import MainPage from './pages/mainPage';
import SettingPage from './pages/settingPage';

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

  runApp() {
    this._body.append(new MainPage('main-page').render());
    this._openSettengs();
  }
}

export default App;
