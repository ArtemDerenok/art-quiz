import CategoryStatistics from '../statistics/categoryStatistics';

class CategoryCard {
  constructor(title, number) {
    this._card = document.createElement('div');
    this._card.classList.add('col');
    this._title = title;
    this._id = `category-${this._title}`;
    this._card.id = this._id;
    this._number = number;
    this._colorSrc = `category-${this._number}-color.png`;
    this._graySrc = `category-${this._number}-grayscale.png`;
    this._count = new CategoryStatistics().statistics[title].count;
  }

  _checkCount() {
    if (this._count > 5) {
      return this._colorSrc;
    }
    return this._graySrc;
  }

  render() {
    this._card.innerHTML += `<div class="card">
      <img src="${this._checkCount()}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title card-title-font">${this._title}</h5>
        <p class="card-text">${this._number}</p>
        <p class="card-text">count: ${this._count}</p>
      </div>
    </div>`;
    return this._card;
  }
}

export default CategoryCard;
