import Page from '../templates/page';

class SettingPage extends Page {
  constructor(idPage) {
    super(idPage);
    this._heading = document.createElement('h3');
    this._heading.textContent = 'SETTINGS';
    this._heading.classList.add('text-center', 'p-3');
    this._buttonsContainer = document.createElement('div');
  }

  _createControlButtons() {
    this._buttonsContainer.classList.add('row', 'justify-content-center', 'gap-2', 'p-5');
    this._buttonsContainer.innerHTML = `<button type="button" class="btn btn-danger col-1" id="save-setting-btn">SAVE</button><button type="button" class="btn btn-danger col-1" id="default-setting-btn">DEFAULTS</button>`;
    return this._buttonsContainer;
  }

  _createMainContent() {
    this._main.classList.add('row', 'justify-content-around');
    this._main.innerHTML = `<div class="col-3 d-flex flex-column align-items-center gap-5 bg-light rounded">
      <img src="volume-on.png" class="pt-3"></img>
      <input type="range" class="form-range" id="customRange1">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
        <label class="form-check-label" for="flexCheckDefault">
          ON/OFF
        </label>
      </div>
      <h3>VOLUME</h3></div>
    <div class="col-3 d-flex flex-column align-items-center gap-5 bg-light rounded">
      <img src="timer-picture.png" class="pt-3"></img>
      <input type="range" class="form-range" min="1" max="10" id="customRange2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
        <label class="form-check-label" for="flexCheckDefault">
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
