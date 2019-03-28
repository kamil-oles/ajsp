export const RATES_COMPONENT = {
  template: require('./rates.html'),
  controller: class RatesComponentCtrl {
    constructor($state, $transitions, $window) {
      this._state = $state;
      this._transitions = $transitions;
      this._window = $window;
    }

    $onInit() {
      this.currentState = this._state.current.name.slice(9);
      this._transitions.onSuccess({ to: 'appRates.**' }, (transition) => {
        this.currentState = transition.to().name.slice(9);
      });
      this._boundEventHandler = this._clearStorage;
      this._window.addEventListener('beforeunload', this._boundEventHandler);
    }

    $onDestroy() {
      this._window.removeEventListener('beforeunload', this.boundEventHandler);
      this._clearStorage();
    }

    _clearStorage() {
      sessionStorage.clear();
    }
  }
};