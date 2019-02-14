export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {};
  }

  link(scope, element, attrs, ctrl) {
    scope.$parent.$on('toast', function showToast(event, message) {
      const MESSAGE_PROCESSED = ctrl.processMessage(message);
      if (element.hasClass('common-toast-hide')) {
        element.toggleClass('common-toast-show common-toast-hide');
      }
      ctrl.toast.show(ctrl.toast.simple()
        .action('ZAMKNIJ')
        .hideDelay(false)
        .parent(element)
        .position('top right')
        .textContent(MESSAGE_PROCESSED)
      ).then(function changeClass() {
        element.toggleClass('common-toast-show common-toast-hide');
      }, function fallback() {
        return;
      });
      event.stopPropagation();
    });
  }
}

class ToastDirectiveCtrl {
  constructor($mdToast, $transitions) {
    this.toast = $mdToast;
    this.transitions = $transitions;
  }

  regex = /-\s(.*)\s\//;

  $onInit() {
    this.transitions.onStart({}, () => {
      this.toast.hide();
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