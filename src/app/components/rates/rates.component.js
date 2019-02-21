export const RATES_COMPONENT = {
  template: require('./rates.html'),
  controller: class RatesComponentCtrl {
    constructor($state, $transitions, $window) {
      this.state = $state;
      this.transitions = $transitions;
      this.window = $window;
    }

    $onInit() {
      this.currentState = this.state.current.name.slice(9);
      this.transitions.onSuccess({ to: 'appRates.**' }, (transition) => {
        this.currentState = transition.to().name.slice(9);
      });
      this.boundEventHandler = this.clearStore;
      this.window.addEventListener('beforeunload', this.boundEventHandler);
    }

    $onDestroy() {
      this.window.removeEventListener('beforeunload', this.boundEventHandler);
      this.clearStore();
    }

    clearStore() {
      sessionStorage.clear();
    }
  }
};