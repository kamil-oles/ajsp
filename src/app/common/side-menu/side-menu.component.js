export const SIDE_MENU_COMPONENT = {
  bindings: {
    menuExpanded: '<'
  },
  template: require('./side-menu.html'),
  controller: class SideMenuComponentController {
    subMenu = false;

    $onChanges(changes) {
      this.menu = changes.menuExpanded.currentValue;
    }

    showSubMenu() {
      this.subMenu = !this.subMenu;
    }
  }
};