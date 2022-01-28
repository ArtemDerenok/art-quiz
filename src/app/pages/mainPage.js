class MainPage {
  constructor(idPage) {
    this._container = document.createElement('div');
    this._container.classList.add('container');
    this._container.classList.add('d-flex');
    this._container.classList.add('flex-column');
    this._container.id = idPage;
    this._header = document.createElement('div');
    this._logo = document.createElement('img');
    this._main = document.createElement('div');
    this._settingButton = document.createElement('button');
  }

  _createHeader() {
    this._header.classList.add('text-center');
    this._header.classList.add('pt-5');
    this._logo.classList.add('rounded');
    this._logo.src = 'logo.png';
    this._header.append(this._logo);
    return this._header;
  }

  _createMainContent() {
    this._main.classList.add('row');
    this._main.classList.add('p-5');
    this._main.innerHTML = `<div class="card col" style="width: 18rem;">
  <img src="artists-quiz.png" class="card-img-top" alt="">
  <div class="card-body">
    <p class="card-text">ARTISTS  QUIZ</p>
  </div>
</div>
<div class="card col offset-3" style="width: 18rem;">
  <img src="pictures-quiz.png" class="card-img-top" alt="">
  <div class="card-body">
    <p class="card-text">PICTURES  QUIZ</p>
  </div>
</div>`;
    return this._main;
  }

  render() {
    this._container.append(this._createHeader());
    this._container.append(this._createMainContent());
    this._settingButton.textContent = 'SETTINGS';
    this._settingButton.classList.add('setting-btn');
    this._container.append(this._settingButton);
    return this._container;
  }
}
export default MainPage;
