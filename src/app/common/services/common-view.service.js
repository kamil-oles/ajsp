export class CommonViewService {
  _breakpoint = 960;
  _views = {
    dCollapsed: 'default',
    dDefault: 'collapsed-d',
    mDefault: 'expanded-m',
    mExpanded: 'collapsed-m'
  };

  onViewChange(currentView, windowWidth) {
    const DASH = /-/.exec(currentView),
      CURRENT_VIEW = DASH ? currentView.slice(0, DASH.index) : currentView,
      DEVICE = (windowWidth < this._breakpoint ? 'm' : 'd'),
      KEY = `${DEVICE}${CURRENT_VIEW.charAt(0).toUpperCase()}${CURRENT_VIEW.slice(1)}`;
    return this._views[KEY];
  }

  returnBreakpoint() {
    return this._breakpoint;
  }

  returnViews() {
    return this._views;
  }
}