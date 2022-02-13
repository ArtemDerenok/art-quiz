import { categoriesStatistics } from '../data/categoriesData';

class CategoryStatistics {
  static _instance;

  _statistics;

  constructor() {
    if (CategoryStatistics._instance) {
      return CategoryStatistics._instance;
    }
    CategoryStatistics._instance = this;
  }

  _getLocalStorage() {
    this._statistics = JSON.parse(localStorage.getItem('categoryStatistics'));
  }

  get statistics() {
    return this._statistics;
  }

  updateLocalStorage() {
    const jsonStatistics = JSON.stringify(this.statistics);
    localStorage.setItem('categoryStatistics', jsonStatistics);
  }

  setLocalStorage() {
    if (!localStorage.getItem('categoryStatistics')) {
      const jsonStatistics = JSON.stringify(categoriesStatistics);
      localStorage.setItem('categoryStatistics', jsonStatistics);
    }
    this._getLocalStorage();
  }
}

export default CategoryStatistics;
