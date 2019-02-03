export const SIDE_MENU_COMPONENT = {
  bindings: {
    menuExpanded: '<'
  },
  template: require('./side-menu.html'),
  controller: class SideMenuComponentController {
    constructor($element) {
      this.element = $element;
    }

    subMenu = false;

    $onInit() {
      this.element.addClass('side-menu-host side-menu-host-expanded');
    }

    $onChanges(changes) {
      if (typeof changes.menuExpanded.previousValue === 'boolean') {
        this.element.toggleClass('side-menu-host-expanded side-menu-host-collapsed');
      }
      this.menu = changes.menuExpanded.currentValue;
      if (!this.menu) {
        this.subMenu = false;
      }
    }

    showSubMenu() {
      this.subMenu = !this.subMenu;
    }
  }
};