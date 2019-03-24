export const FOOTER_COMPONENT = {
  bindings: { viewState: '<' },
  template: require('./footer.html'),
  controller: class FooterComponentCtrl {
    constructor(menu) {
      this.menu = menu;
    }

    nbp = 'https://www.nbp.pl/';
  }
};