class CommonComponentCtrl {
  /* @ngInject */
  constructor($element, $scope, $timeout, $window, CommonTransitions, CommonView) {
    this._element = $element;
    this._scope = $scope;
    this._timeout = $timeout;
    this._transitionsHooks = CommonTransitions;
    this._window = $window;
    this._view = CommonView;
  }

  _resizeTimeout = false;

  $onInit() {
    this.view = this._view.returnViews().dCollapsed;
    this._window.addEventListener('resize', this._resizeThrottler.bind(this));
    this._transitionsHooks.setTransitionsHooks(this);
    this._scope.$on('loader', (event, loader) => {
      this.loader = (!this._transitionsHooks.returnLoaderState() ? loader : false);
    });
  }

  $postLink() {
    this._body = this._element.parent().parent();
  }

  onViewChange() {
    this.view = this._view.onViewChange(this.view, this._window.innerWidth);
    if (this.view === this._view.returnViews().mDefault) {
      this._body.addClass('common-block-scroll');
    }
    if (this.view === this._view.returnViews().mExpanded) {
      this._timeout(() => {
        this.view = this._view.returnViews().dCollapsed;
      }, 200);
      this._body.removeClass('common-block-scroll');
    }
  }

  _actualResizeHandler() {
    const MOBILE = (this._window.innerWidth < this._view.returnBreakpoint());
    if (this.view === this._view.returnViews().mDefault && !MOBILE) {
      this.view = this._view.returnViews().dCollapsed;
      this._body.removeClass('common-block-scroll');
    } else if (this.view === this._view.returnViews().dDefault && MOBILE) {
      this.view = this._view.returnViews().dCollapsed;
      this._body.removeClass('common-block-scroll');
    }
  }

  _resizeThrottler() {
    if (!this._resizeTimeout) {
      this._resizeTimeout = true;
      this._timeout(() => {
        this._resizeTimeout = false;
        this._actualResizeHandler();
      }, 100);
    }
  }
}

export const COMMON_COMPONENT = {
  template: require('./common.html'),
  controller: CommonComponentCtrl
};