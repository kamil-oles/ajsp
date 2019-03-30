class FooterComponentCtrl {
  /* @ngInject */
  constructor(menu) {
    this.menu = menu;
  }

  nbp = 'https://www.nbp.pl/';
}

export const FOOTER_COMPONENT = {
  bindings: { viewState: '<' },
  template: require('./footer.html'),
  controller: FooterComponentCtrl
};