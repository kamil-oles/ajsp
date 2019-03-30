class AppComponentCtrl {
  /* @ngInject */
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

export const APP_COMPONENT = {
  template: require('./app.html'),
  controller: AppComponentCtrl
};