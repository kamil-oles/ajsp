export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {};
  }
}

class ToastDirectiveCtrl {
  constructor($element, $mdToast, $scope, $transitions) {
    this.element = $element;
    this.scope = $scope;
    this.toast = $mdToast;
    this.transitions = $transitions;
  }

  regex = /-\s(.*)\s\//;

  $onInit() {
    this.transitions.onStart({}, () => {
      this.toast.hide();
    });
  }

  $postLink() {
    this.scope.$parent.$on('toast', (event, message) => {
      const MESSAGE_PROCESSED = this.processMessage(message);
      if (this.element.hasClass('common-toast-hide')) {
        this.element.toggleClass('common-toast-show common-toast-hide');
      }
      this.toast.show(this.toast.simple()
        .action('ZAMKNIJ')
        .hideDelay(false)
        .parent(this.element)
        .position('top right')
        .textContent(MESSAGE_PROCESSED)
      ).then(() => {
        this.element.toggleClass('common-toast-show common-toast-hide');
      }, function fallback() {
        return;
      });
      event.stopPropagation();
    });
  }

  processMessage(message) {
    const RESULT = this.regex.exec(message);
    if (Array.isArray(RESULT)) {
      return RESULT[1];
    } else {
      return '';
    }
  }
}