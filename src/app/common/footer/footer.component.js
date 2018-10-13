import templateUrl from './footer.html';

export const footerComponent = {
  templateUrl,
  controller: class FooterComponentController {
    constructor() {
      this.menu = [
        {
          title: 'Kalkulator',
          url: 'appConverter'
        },
        {
          title: 'Kursy',
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