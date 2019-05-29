class RatesTableCellDirectiveCtrl {
  /* @ngInject */
  constructor($element, $scope, eventEmitter) {
    this._element = $element;
    this._eventEmitter = eventEmitter;
    this._scope = $scope;
  }

  $postLink() {
    if (this._element[0].previousElementSibling) {
      this._scope.passElement(this._eventEmitter(this._element));
    }
  }
}

export class RatesTableCellDirective {
  constructor() {
    this.controller = RatesTableCellDirectiveCtrl;
    this.restrict = 'A';
    this.scope = { passElement: '&' };
  }
}