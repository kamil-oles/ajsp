export const RATES_COMPONENT = {
  template: require('./rates.html'),
  controller: class RatesComponentCtrl {
    constructor($transitions) {
      this.transitions = $transitions;
    }

    state = 'current';

    $onInit() {
      this.transitions.onSuccess({ to: 'appRates.**' }, (transition) => {
        this.state = transition.to().name.slice(9);
      });
    }
  }
};