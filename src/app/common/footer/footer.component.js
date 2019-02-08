export const FOOTER_COMPONENT = {
  bindings: {
    uiState: '<'
  },
  template: require('./footer.html'),
  controller: class FooterComponentController {
    $onChanges(changes) {
      // this.menu = changes.menuExpanded.currentValue;
    }
  }
};