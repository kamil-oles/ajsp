export const APP_COMPONENT = {
  template: require('./app.html'),
  controller: class AppComponentCtrl {
    constructor($transitions, $window) {
      this._transitions = $transitions;
      this._window = $window;
    }

    $onInit() {
      this._transitions.onSuccess({}, (transition) => {
        const PARAMS = transition.params();
        if (PARAMS.from !== 'tab') {
          this._window.scroll(0, 0);
        }
      });
    }
  }
};