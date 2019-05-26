class RatesTableComponentCtrl {
  /* @ngInject */
  constructor($element, $filter, RatesTableSort) {
    this._element = $element;
    this._sortService = RatesTableSort;
    this.filter = $filter;
  }

  _firstColumn = [];

  $onChanges(changes) {
    if (changes.rows.currentValue) {
      this.sortBy = this._findColumnToSortBy();
      this.sortDirection = 'ASC';
      this.icon = 'keyboard_arrow_up';
    }
  }

  $onInit() {
    this.columns.forEach(function setMinWidth(el) {
      if (el.minWidth) {
        el.minWidth = { 'flex-basis': `${el.minWidth}rem` };
      }
    });
  }

  $postLink() {
    this._rowsArea = this._element.children().children()[1];
    this._rowsArea.addEventListener('scroll', event => {
      this._setAnimation(event);
    });
  }

  fillArray(element) {
    this._firstColumn.push(element);
  }

  sort(prop) {
    if (prop === this.sortBy) {
      this.sortDirection = (this.sortDirection === 'ASC' ? 'DESC' : 'ASC');
    }
    this._sortService.sort(this.rows, prop, this.sortDirection);
    this.icon = `keyboard_arrow_${this.sortDirection === 'ASC' ? 'up' : 'down'}`;
    this.sortBy = prop;
  }

  _findColumnToSortBy() {
    const COLUMN = this.columns.find(element => element.sortBy);
    return (COLUMN ? COLUMN.prop : this.columns[0].prop);
  }

  _setAnimation(event) {
    function addCss(event) {
      this._firstColumn.forEach(function setAnimation(element) {
        element.css('transform', `translate3d(${event.target.scrollLeft}px, 0, 0)`);
      });
    }
    requestAnimationFrame(addCss.bind(this, event));
  }
}

export const RATES_TABLE_COMPONENT = {
  bindings: {
    columns: '<',
    rows: '<'
  },
  template: require('./rates-table.html'),
  controller: RatesTableComponentCtrl
};