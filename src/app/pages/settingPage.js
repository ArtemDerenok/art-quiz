import Page from '../templates/page';

class SettingPage extends Page {
  constructor(idPage) {
    super(idPage);
  }

  _createMainContent() {
    this._main.textContent = 'Settings Page';
    return this._main;
  }

  render() {
    this._container.append(this._createHeader());
    this._container.append(this._createMainContent());
    return this._container;
  }
}

export default SettingPage;
