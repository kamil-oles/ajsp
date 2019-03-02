export const CONVERTER_COMPONENT = {
  bindings: {
    currencies: '<'
  },
  template: require('./converter.html'),
  controller: class ConverterComponentCtrl {
    $onInit() {
      this.showRate = false;
    }

    updateRate(data) {
      this.rateData = data;
      this.showRate = true;
    }
  }
};