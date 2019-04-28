class ToastDirectiveCtrl {
  /* @ngInject */
  constructor($element, $mdToast, $scope, $transitions) {
    this._element = $element;
    this._scope = $scope;
    this._toast = $mdToast;
    this._transitions = $transitions;
  }

  _regex1 = /-\s(.+)\s\//;
  _regex2 = /\w+\s\w+$/;

  $onInit() {
    this._transitions.onStart({}, () => {
      this._toast.hide();
    });
    this._scope.$on('hideToast', () => {
      this._toast.hide();
    });
  }

  $postLink() {
    this._scope.$parent.$on('toast', (event, error) => {
      const MESSAGE_PROCESSED = this._processMessage(error);
      if (this._element.hasClass('common-toast-hide')) {
        this._toggle();
      }
      this._toast.show(this._toast.simple()
        .action('ZAMKNIJ')
        .actionKey('z')
        .hideDelay(false)
        .parent(this._element)
        .position('top right')
        .textContent(MESSAGE_PROCESSED)
      ).then(() => {
        this._toggle();
      }, function fallback() {
        return;
      });
    });
  }

  _processMessage(error) {
    if (error.status === 400) {
      const RESULT = this._regex1.exec(error.data);
      console.log(RESULT);
      return RESULT[1];
    } else if (error.status === 404) {
      const RESULT = this._regex2.exec(error.data);
      console.log(RESULT);
      return RESULT[0];
    } else {
      return 'Brak połączenia z serwerem';
    }
  }

  _toggle() {
    this._element.toggleClass('common-toast-show common-toast-hide');
  }
}

export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {};
  }
}