class ChartsLegendComponentCtrl {
  $onChanges(changes) {
    if (changes.codes.currentValue[1].code) {
      this.secondCode = changes.codes.currentValue[1].code;
    }
  }
}

export const CHARTS_LEGEND_COMPONENT = {
  bindings: { codes: '<' },
  template: require('./charts-legend.html'),
  controller: ChartsLegendComponentCtrl
};