export const APP_COMPONENT = {
  template: require('./app.html'),
  controller: class AppComponentCtrl {
    constructor($transitions, $window) {
      this.transitions = $transitions;
      this.window = $window;
    }

    $onInit() {
      this.transitions.onSuccess({}, (transition) => {
        const PARAMS = transition.params();
        if (PARAMS.from !== 'tab') {
          this.window.scroll(0, 0);
        }
      });
    }
  }
};