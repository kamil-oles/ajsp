import * as pacakges from '../../../../package.json';

class SideMenuComponentCtrl {
  /* @ngInject */
  constructor(menu) {
    this.menu = menu;
  }

  $onInit() {
    this.version = pacakges.version;
  }
}

export const SIDE_MENU_COMPONENT = {
  bindings: { viewState: '<' },
  template: require('./side-menu.html'),
  controller: SideMenuComponentCtrl
};