import { categoriesStatistics } from '../data/categoriesData';

class CategoryStatistics {
  static _instance;

  statistics;

  constructor() {
    if (CategoryStatistics._instance) {
      return CategoryStatistics._instance;
    }
    CategoryStatistics._instance = this;
  }

  _getLocalStorage() {
    this.statistics = JSON.parse(localStorage.getItem('categoryStatistics'));
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
