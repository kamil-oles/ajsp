export class CommonTransitionsService {
  constructor($transitions) {
    this._transitions = $transitions;
  }

  _blockLoader = true;

  returnLoaderState() {
    return this._blockLoader;
  }

  setTransitionsHooks(that) {
    this._transitions.onBefore({}, () => {
      this._blockLoader = false;
    });
    this._transitions.onSuccess({}, () => {
      this._blockLoader = true;
      this._hideMenu.call(that);
    });
    this._transitions.onError({}, () => {
      this._blockLoader = true;
      this._hideMenu.call(that);
    });
  }

  _hideMenu() {
    if (this.view === this._view.returnViews().mDefault) {
      this.view = this._view.returnViews().mExpanded;
      this._timeout(() => {
        this.view = this._view.returnViews().dCollapsed;
      }, 200);
      this._body.removeClass('common-block-scroll');
    }
  }
}