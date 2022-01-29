import Button from '../components/button';
import Page from '../templates/page';

class CategoryPage extends Page {
  constructor(idPage) {
    super(idPage);
    this._headingContainer = document.createElement('div');
    this._heading = document.createElement('h3');
  }

  _createHeading() {
    this._headingContainer.classList.add('row', 'flex-row');
    this._headingContainer.id = 'category-heading';
    this._heading.classList.add('text-center', 'p-3', 'col');
    this._heading.textContent = 'CATEGORIES';
    this._headingContainer.append(new Button('home-btn', 'home-button', 'HOME').render());
    this._headingContainer.append(this._heading);
    this._headingContainer.append(new Button('score-btn', 'score-button', 'SCORE').render());
    return this._headingContainer;
  }

  _createMainContent() {
    this._main.textContent = 'Category Page';
    return this._main;
  }

  render() {
    this._container.append(this._createHeader());
    this._container.append(this._createHeading());
    this._container.append(this._createMainContent());
    return this._container;
  }
}

export default CategoryPage;
