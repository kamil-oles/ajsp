export class RatesCurrentHeadersService {
  headers() {
    return [
      {
        code: 'code',
        label: 'Kod'
      },
      {
        code: 'currency',
        label: 'Waluta'
      },
      {
        code: 'bid',
        label: 'Cena zakupu'
      },
      {
        code: 'ask',
        label: 'Cena sprzedaży'
      }
    ];
  }
}