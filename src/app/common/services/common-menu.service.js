export class CompmonMenuService {
  menu() {
    return [
      {
        state: 'appConverter',
        subitems: null,
        title: 'Kalkulator walutowy',
      },
      {
        state: 'appRates.current',
        subitems: [
          {
            state: 'appRates.current',
            title: 'Kursy aktualne'
          },
          {
            state: 'appRates.historical',
            title: 'Kursy historyczne'
          }
        ],
        title: 'Kursy walut'
      },
      {
        state: '',
        subitems: null,
        title: 'O projekcie'
      }
    ];
  }
}