export const SIDE_MENU_COMPONENT = {
  bindings: {
    uiState: '<'
  },
  template: require('./side-menu.html'),
  controller: class SideMenuComponentCtrl {
    constructor(CommonMenuService) {
      this.cms = CommonMenuService;
    }

    $onInit() {
      this.menu = this.cms.menu();
    }
  }
};