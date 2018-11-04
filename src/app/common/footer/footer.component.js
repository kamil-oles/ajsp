export const footerComponent = {
  template: require('./footer.html'),
  controller: class FooterComponentController {
    constructor() {
      this.menu = [
        {
          title: 'Kalkulator',
          url: 'appConverter'
        },
        {
          title: 'Kursy walut',
          url: 'appRates.current'
        },
        {
          title: 'O projekcie',
          url: ''
        }
      ];
    }
  }
};