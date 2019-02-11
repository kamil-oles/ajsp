export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveController;
    this.restrict = 'A';
    this.scope = {};
  }

  link(scope, element, attrs, controller) {
    scope.$parent.$on('toast', (event, message) => {
      const messageProcessed = controller.processMessage(message);
      if (element.hasClass('hide')) {
        element.toggleClass('common-toast-show common-toast-hide');
      }
      controller.toast.show(
        controller.toast.simple()
          .action('ZAMKNIJ')
          .hideDelay(false)
          .parent(element)
          .position('top right')
          .textContent(messageProcessed)
      ).then(() => {
        element.toggleClass('common-toast-show common-toast-hide');
      }, () => {
        return;
      });
      event.stopPropagation();
    });
  }
}

class ToastDirectiveController {
  constructor($mdToast) {
    this.toast = $mdToast;
  }

  regex = /-\s(.*)\s\//;

  processMessage(message) {
    const result = this.regex.exec(message);
    if (Array.isArray(result)) {
      return result[1];
    } else {
      return '';
    }
  }
}