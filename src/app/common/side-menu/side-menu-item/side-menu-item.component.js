export const SIDE_MENU_ITEM_COMPONENT = {
  bindings: {
    menuItem: '<'
  },
  template: require('./side-menu-item.html'),
  controller: class SideMenuItemComponentCtrl {
    submenu = false;

    expandSubmenu() {
      this.submenu = !this.submenu;
    }
  }
};