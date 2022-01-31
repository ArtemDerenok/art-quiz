import { categoriesDataArr } from '../data/categoriesData';
import Button from '../components/button';
import CategoryCard from '../components/categoryCard';
import Page from '../templates/page';

class CategoryPage extends Page {
  constructor(idPage) {
    super(idPage);
    this._headingContainer = document.createElement('div');
    this._heading = document.createElement('h3');
  }

  static createRows() {
    const result = [];
    for (let i = 0; i < Math.ceil(categoriesDataArr.length / 5); i += 1) {
      const row = document.createElement('div');
      row.classList.add('row', 'pb-3');
      result.push(row);
    }
    return result;
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
    this._main.classList.add('container');
    const rows = CategoryPage.createRows();
    let cnt = 0;
    categoriesDataArr.forEach((elem, index) => {
      rows[cnt].append(new CategoryCard(elem, index + 1).render());
      if ((index + 1) % 5 === 0) {
        cnt += 1;
      }
    });
    this._main.append(...rows);
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
