export const FOOTER_COMPONENT = {
  bindings: {
    menu: '<',
    uiState: '<'
  },
  template: require('./footer.html'),
  controller: class FooterComponentCtrl {
    nbp = 'https://www.nbp.pl/';
  }
};