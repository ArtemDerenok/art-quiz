import MainPage from './pages/mainPage';

class App {
  constructor() {
    this._body = document.body;
  }

  runApp() {
    this._body.append(new MainPage('main-page').render());
  }
}

export default App;
