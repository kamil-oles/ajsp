export const APP_COMPONENT = {
  template: require('./app.html'),
  controller: class AppComponentCtrl {
    constructor($transitions, $window) {
      this.transitions = $transitions;
      this.window = $window;
    }

    $onInit() {
      this.transitions.onSuccess({}, () => {
        this.window.scroll(0, 0);
      });
    }
  }
};