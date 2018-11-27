export const commonComponent = {
  template: require('./common.html'),
  controller: class CommonComponentController {
    constructor($scope) {
      this.scope = $scope;
    }

    ngOnInit() {
      Object.assign(this.scope, { show: false });
    }
  }
};