export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveController;
    this.restrict = 'A';
    this.scope = {};
  }

  link(scope, element, attrs, controller) {
    scope.$parent.$on('toast', (event, message) => {
      controller.toast.show(
        controller.toast.simple()
          .hideDelay(false)
          .parent(element)
          .position('top, right')
          .textContent(message)
      );
      event.stopPropagation();
    });
  }
}

class ToastDirectiveController {
  constructor($mdToast) {
    this.toast = $mdToast;
  }
}