export const SIDE_MENU_COMPONENT = {
  bindings: {
    menuExpanded: '<'
  },
  template: require('./side-menu.html'),
  controller: class SideMenuComponentController {
    subMenu = false;

    showSubMenu() {
      this.subMenu = !this.subMenu;
    }
  }
};