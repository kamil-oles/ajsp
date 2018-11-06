export const ratesComponent = {
  template: require('./rates.html'),
  controller: class RatesComponentController {
    constructor($state, $transitions) {
      this.state = $state;
      this.transitions = $transitions;
    }

    $onInit() {
      this.setState();
      this.transitions.onSuccess({}, (transition) => console.log(transition));
    }

    $onDestroy() {
      console.log('dupa');
    }

    navigate(state) {
      this.state.go(state).then(() => {
        this.setState();
      });
    }

    setState() {
      this.current = this.state.current.name === 'appRates.current' ? true : false;
      this.historical = !this.current;
    }
  }
};