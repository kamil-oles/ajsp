export const commonComponent = {
  template: require('./common.html'),
  controller: class CommonComponentController {
    menuExpanded = true;

    onMenuStateChange() {
      this.menuExpanded = !this.menuExpanded;
    }
  }
};