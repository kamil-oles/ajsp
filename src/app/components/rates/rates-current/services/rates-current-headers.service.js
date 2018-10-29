export class RatesCurrentHeadersService {
  headers() {
    return [
      {
        align: 'left',
        code: 'code',
        label: 'Kod'
      },
      {
        align: 'left',
        code: 'currency',
        label: 'Waluta'
      },
      {
        align: 'right',
        code: 'bid',
        label: 'Cena zakupu'
      },
      {
        align: 'right',
        code: 'ask',
        label: 'Cena sprzedaży'
      }
    ];
  }
}