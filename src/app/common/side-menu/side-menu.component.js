class SideMenuComponentCtrl {
  /* @ngInject */
  constructor(menu) {
    this.menu = menu;
  }
}

export const SIDE_MENU_COMPONENT = {
  bindings: { viewState: '<' },
  template: require('./side-menu.html'),
  controller: SideMenuComponentCtrl
};