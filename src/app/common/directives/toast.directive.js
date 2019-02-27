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

  regex1 = /-\s(.*)\s\//;
  regex2 = /\w*\s\w*$/;

  $onInit() {
    this.transitions.onStart({}, () => {
      this.toast.hide();
    });
  }

  $postLink() {
    this.scope.$parent.$on('toast', (event, message) => {
      const MESSAGE_PROCESSED = this.processMessage(message);
      if (this.element.hasClass('common-toast-hide')) {
        this.toggle();
      }
      this.toast.show(this.toast.simple()
        .action('ZAMKNIJ')
        .hideDelay(false)
        .parent(this.element)
        .position('top right')
        .textContent(MESSAGE_PROCESSED)
      ).then(() => {
        this.toggle();
      }, function fallback() {
        return;
      });
      event.stopPropagation();
    });
  }

  processMessage(message) {
    let result = this.regex1.exec(message);
    if (Array.isArray(result)) {
      return result[1];
    }
    result = this.regex2.exec(message);
    if (Array.isArray(result)) {
      return result[0];
    }
  }

  toggle() {
    this.element.toggleClass('common-toast-show common-toast-hide');
  }
}