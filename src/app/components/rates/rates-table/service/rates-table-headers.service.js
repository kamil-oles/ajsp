export class RatesTableHeadersService {
  current = [
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
  historical = [
    {
      align: 'left',
      code: 'date',
      label: 'Data'
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
  ]

  headers(view) {
    const headers = {
      current: this.current,
      historical: this.historical
    };
    return headers[view];
  }
}