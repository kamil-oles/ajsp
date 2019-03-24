export const SIDE_MENU_COMPONENT = {
  bindings: { viewState: '<' },
  template: require('./side-menu.html'),
  controller: class SideMenuComponentCtrl {
    constructor(menu) {
      this.menu = menu;
    }
  }
};