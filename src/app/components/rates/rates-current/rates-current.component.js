class RatesCurrentComponentCtrl {
  /* @ngInject */
  constructor(headers) {
    this.headers = headers.current;
  }

  $onInit() {
    this.columns = [
      {
        label: 'Kod',
        minWidth: '3.875',
        prop: 'code'
      },
      {
        label: 'Waluta',
        minWidth: '8.5',
        prop: 'currency',
        sortBy: true
      },
      {
        alignToRight: true,
        label: 'Cena zakupu',
        minWidth: '7.125',
        prop: 'bid'
      },
      {
        alignToRight: true,
        label: 'Cena sprzedaży',
        minWidth: '8.125',
        prop: 'ask'
      }
    ];
  }
}

export const RATES_CURRENT_COMPONENT = {
  bindings: { initData: '<' },
  template: require('./rates-current.html'),
  controller: RatesCurrentComponentCtrl
};