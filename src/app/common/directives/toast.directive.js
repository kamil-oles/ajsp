export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveController;
    this.restrict = 'A';
    this.scope = {};
  }

  link(scope, element, attrs, controller) {
    scope.$parent.$on('toast', (event, message) => {
      const messageProcessed = controller.processMessage(message);
      controller.toast.show(
        controller.toast.simple()
          .action('Zamknij')
          .hideDelay(false)
          .parent(element)
          .position('top, right')
          .textContent(messageProcessed)
      );
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