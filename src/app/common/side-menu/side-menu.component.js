export const SIDE_MENU_COMPONENT = {
  bindings: {
    uiState: '<'
  },
  template: require('./side-menu.html'),
  controller: class SideMenuComponentController {
    constructor(CommonMenuService) {
      this.cms = CommonMenuService;
    }

    subMenu = false;

    $onInit() {
      this.menu = this.cms.menu();
    }

    showSubMenu() {
      this.subMenu = !this.subMenu;
    }
  }
};