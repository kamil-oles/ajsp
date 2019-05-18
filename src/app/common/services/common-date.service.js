export class CommonDateService {
  /* @ngInject */
  constructor($filter) {
    this._filter = $filter;
  }

  format(date, display) {
    return this._filter('date')(date, `${display ? 'dd.MM.yyyy' : 'yyyy-MM-dd'}`);
  }

  setDateFrom(days) {
    const START = new Date();
    return new Date(START.setDate(START.getDate() - days));
  }
}