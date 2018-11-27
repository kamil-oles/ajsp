export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveController;
    this.restrict = 'A';
    this.scope = {};
  }

  link(scope, element, attrs, controller) {
    scope.$parent.$on('toast', (event, message) => {
      const messageProcessed = controller.processMessage(message);
      scope.$parent.show = true;
      // setTimeout(function () {
      controller.toast.show({
        controller: 'toastController',
        controllerAs: 'toast',
        hideDelay: false,
        parent: element,
        position: 'top right',
        preserveScope: true,
        resolve: {
          Message: () => messageProcessed
        },
        scope: scope.$new(true, scope.$parent),
        template: `<md-toast>
          <span class="md-toast-text" flex>
            {{toast.message}}
          </span>
          <md-button ng-click="toast.close()">
            ZAMKNIJ
          </md-button>
        </md-toast>`
      });
      // }, 100);
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

export class ToastController {
  constructor($mdToast, $scope, Message) {
    this.message = Message;
    this.scope = $scope;
    this.toast = $mdToast;
  }

  close() {
    this.toast.hide().then(() => {
      this.scope.$parent.show = false;
    });
  }
}