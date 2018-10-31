import templateUrl from './rates-table.html';

export const ratesTableComponent = {
  bindings: {
    headers: '<',
    rates: '<'
  },
  templateUrl,
  controller: class RatesTableComponentController {
    constructor($animate, $document, ComponentsSortService, RatesTableDataService) {
      this.animate = $animate;
      this.css = ComponentsSortService;
      this.document = $document;
      this.icon = 'keyboard_arrow_up';
      this.rtds = RatesTableDataService;
      this.sortBy = 'currency';
      this.sortDirection = 'ASC';
    }

    $onChanges(changes) {
      this.data = this.rtds.prepare(changes.rates.currentValue);
      // if (changes.currency) {
      //   this.currency = Object.assign({}, changes.currency.currentValue);
      // }
    }

    $postLink() {
      this.elements = this.document.find('th');
      console.log(this.elements);
    }

    sort(code) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
      if (code === this.sortBy) {
        this.rotate = true;
      } else {
        this.rotate = false;
        this.icon = this.sortDirection === 'ASC' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
      }
      this.css.sort(this.data, code, this.sortDirection);
      this.sortBy = code;
    }
  }
};