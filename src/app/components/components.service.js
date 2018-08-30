export class ComponentsService {
  constructor() {
    this.currencies = [
      { currency: 'złoty polski', code: 'PLN', type: 'Główne' },
      { currency: 'dolar amerykański', code: 'USD', type: 'Główne' },
      { currency: 'euro', code: 'EUR', type: 'Główne' },
      { currency: 'frank szwajcarski', code: 'CHF', type: 'Główne' },
      { currency: 'funt szterling', code: 'GBP', type: 'Główne' },
      { currency: 'dolar australijski', code: 'AUD', type: 'Pozostałe' },
      { currency: 'dolar kanadyjski', code: 'CAD', type: 'Pozostałe' },
      { currency: 'forint węgierski', code: 'HUF', type: 'Pozostałe' },
      { currency: 'jen japoński', code: 'JPY', type: 'Pozostałe' },
      { currency: 'korona czeska', code: 'CZK', type: 'Pozostałe' },
      { currency: 'korona duńska', code: 'DKK', type: 'Pozostałe' },
      { currency: 'korona norweska', code: 'NOK', type: 'Pozostałe' },
      { currency: 'korona szwedzka', code: 'SEK', type: 'Pozostałe' }
    ];
  }
}