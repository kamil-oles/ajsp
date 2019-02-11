export const FOOTER_COMPONENT = {
  bindings: {
    menu: '<',
    viewState: '<'
  },
  template: require('./footer.html'),
  controller: class FooterComponentCtrl {
    nbp = 'https://www.nbp.pl/';
  }
};