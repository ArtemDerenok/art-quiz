class Question {
  constructor(srcImage, rightAnswer, name, year) {
    this._src = `https://raw.githubusercontent.com/ArtemDerenok/image-data/master/img/${srcImage}.jpg`;
    this._rightAnswer = rightAnswer;
    this._pictureName = name;
    this._yearCreation = year;
    this._container = document.createElement('div');
    this._answersContainer = document.createElement('div');
    this._image = document.createElement('img');
  }

  _createMainContent() {
    this._container.classList.add('container', 'd-flex', 'flex-column', 'align-items-center');
    this._image.src = this._src;
    this._image.classList.add('img-fluid');
    this._container.append(this._image);
    this._answersContainer.classList.add('row', 'row-cols-2', 'w-50', 'pt-5');
    this._answersContainer.innerHTML = `<div class="card col"><div class="card-body"><h5 class="card-title">${this._rightAnswer}</h5></div></div><div class="card col"><div class="card-body"><h5 class="card-title">${this._rightAnswer}</h5></div></div><div class="card col"><div class="card-body"><h5 class="card-title">${this._rightAnswer}</h5></div></div><div class="card col"><div class="card-body"><h5 class="card-title">${this._rightAnswer}</h5></div>`;
    this._container.append(this._answersContainer);
    return this._container;
  }

  render() {
    return this._createMainContent();
  }
}

export default Question;
