class RatesTableColorDirectiveCtrl {
  /* @ngInject */
  constructor($element, $scope) {
    this._element = $element;
    this._scope = $scope;
  }

  $postLink() {
    if (this._scope.colors && this._scope.content > 0) {
      this._element.addClass('rates-table-green');
    } else if (this._scope.colors && this._scope.content < 0) {
      this._element.addClass('rates-table-red');
    }
  }
}

export class RatesTableColorDirective {
  constructor() {
    this.controller = RatesTableColorDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {
      content: '<',
      colors: '<'
    };
  }
}