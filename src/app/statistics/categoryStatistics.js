import { categoriesStatistics } from '../data/categoriesData';

/* eslint-disable no-constructor-return */
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

  setLocalStorage() {
    if (!localStorage.getItem('categoryStatistics')) {
      const jsonStatistics = JSON.stringify(categoriesStatistics);
      localStorage.setItem('categoryStatistics', jsonStatistics);
    }
    this._getLocalStorage();
  }
}

export default CategoryStatistics;
