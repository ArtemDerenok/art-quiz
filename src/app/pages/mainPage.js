import Button from '../components/button';
import Page from '../templates/page';

class MainPage extends Page {
  constructor(idPage) {
    super(idPage);
    this._settingButton = new Button('setting-btn', 'setting-button', 'settings').render();
  }

  _createMainContent() {
    this._main.classList.add('row', 'p-5', 'justify-content-around', 'gy-5');
    this._main.id = 'category-btns';
    this._main.innerHTML = `<div class="card col-lg-4 cursor" id="artist-category">
  <img src="artists-quiz.png" class="card-img-top" alt="">
  <div class="card-body">
    <p class="card-text">ARTISTS  QUIZ</p>
  </div>
</div>
<div class="card col-lg-4 cursor" id="pictures-category">
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
    this._container.append(this._settingButton);
    return this._container;
  }
}

export default MainPage;
