export const RATES_COMPONENT = {
  template: require('./rates.html'),
  controller: class RatesComponentCtrl {
    constructor($state, $transitions) {
      this.state = $state;
      this.transitions = $transitions;
    }

    $onInit() {
      this.currentState = this.state.current.name.slice(9);
      this.transitions.onSuccess({ to: 'appRates.**' }, (transition) => {
        this.currentState = transition.to().name.slice(9);
      });
    }
  }
};