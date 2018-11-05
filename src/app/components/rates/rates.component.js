export const ratesComponent = {
  template: require('./rates.html'),
  controller: class RatesComponentController {
    constructor($state) {
      this.state = $state;
    }

    $onInit() {
      this.setState();
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