export class ToastDirective {
  constructor() {
    this.controller = ToastDirectiveController;
    this.restrict = 'A';
    this.scope = {};
  }

  link(scope, element, attrs, controller) {
    scope.$parent.$on('toast', (event, message) => {
      const messageProcessed = controller.processMessage(message);
      controller.toast.show({
        controller: 'toastController',
        controllerAs: 'toast',
        hideDelay: false,
        parent: element,
        position: 'top right',
        resolve: {
          Message: () => messageProcessed
        },
        template: `<md-toast>
          <span class="md-toast-text" flex>
            {{toast.message}}
          </span>
          <md-button ng-click="toast.close()">
            ZAMKNIJ
          </md-button>
        </md-toast>`
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

export class ToastController {
  constructor($mdToast, Message) {
    this.toast = $mdToast;
    this.message = Message;
  }

  close() {
    this.toast.hide().then(() => {
      console.log('close');
    });
  }
}