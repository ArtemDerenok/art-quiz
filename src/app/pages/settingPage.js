import Button from '../components/button';
import Page from '../templates/page';

class SettingPage extends Page {
  constructor(idPage) {
    super(idPage);
    this._heading = document.createElement('h3');
    this._heading.textContent = 'SETTINGS';
    this._heading.classList.add('text-center', 'p-3');
    this._buttonsContainer = document.createElement('div');
    this._saveButton = new Button('simple-btn', 'save-button', 'save').render();
    this._defaultButton = new Button('simple-btn', 'default-button', 'default').render();
    this._settings = JSON.parse(localStorage.getItem('settingsQuiz'));
  }

  _createControlButtons() {
    this._buttonsContainer.classList.add('row', 'justify-content-center', 'gap-2', 'p-5');
    this._buttonsContainer.id = 'settings-buttons-container';
    this._buttonsContainer.append(this._saveButton);
    this._buttonsContainer.append(this._defaultButton);
    return this._buttonsContainer;
  }

  _createMainContent() {
    this._main.classList.add('row', 'justify-content-around');
    this._main.innerHTML = `<div class="col-3 d-flex flex-column align-items-center gap-5 bg-light rounded">
      <img src="volume-on.png" class="pt-3"></img>
      <input type="range" class="form-range" id="input-sound-value" value="${
        this._settings.sound.volumeLevel
      }">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="checkbox-volume" ${
          this._settings.sound.onSound ? 'checked' : ''
        }>
        <label class="form-check-label" for="checkbox-volume">
          ON/OFF
        </label>
      </div>
      <h3>VOLUME</h3></div>
    <div class="col-3 d-flex flex-column align-items-center gap-5 bg-light rounded">
      <img src="timer-picture.png" class="pt-3"></img>
      <input type="range" class="form-range" min="1" max="30" id="input-time-value" value="${
        this._settings.timer.time
      }">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="checkbox-timer" ${
          this._settings.timer.onTimer ? 'checked' : ''
        }>
        <label class="form-check-label" for="checkbox-timer">
          ON/OFF
        </label>
      </div>
      <h3 class="pb-2">TIME GAME</h3>
    </div>`;
    return this._main;
  }

  render() {
    this._container.append(this._createHeader());
    this._container.append(this._heading);
    this._container.append(this._createMainContent());
    this._container.append(this._createControlButtons());
    return this._container;
  }
}

export default SettingPage;
