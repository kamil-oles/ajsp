export const commonComponent = {
  template: require('./common.html'),
  controller: class CommonComponentController {
    menuExpanded = false;

    onMenuStateChange() {
      this.menuExpanded = !this.menuExpanded;
    }
  }
};