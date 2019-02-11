export const COMMON_COMPONENT = {
  template: require('./common.html'),
  controller: class CommonComponentCtrl {
    constructor($timeout, $window, CommonMenuService) {
      this.cms = CommonMenuService;
      this.timeout = $timeout;
      this.window = $window;
    }

    breakpoint = 960;
    resizeTimeout = false;

    viewStates = {
      dCollapsed: 'default',
      dDefault: 'collapsed-d',
      mDefault: 'expanded-m',
      mExpanded: 'collapsed-m'
    };

    $onInit() {
      this.menu = this.cms.menu();
      this.viewState = this.viewStates.dCollapsed;
      this.window.addEventListener('resize', this.resizeThrottler.bind(this));
    }

    actualResizeHandler() {
      const MOBILE = (this.window.innerWidth < this.breakpoint);
      if (this.viewState === this.viewStates.mDefault && !MOBILE) {
        this.viewState = this.viewStates.dCollapsed;
      } else if (this.viewState === this.viewStates.dDefault && MOBILE) {
        this.viewState = this.viewStates.dCollapsed;
      }
    }

    onViewStateChange() {
      const DASH = /-/.exec(this.viewState),
        CURRENT_STATE = DASH ? this.viewState.slice(0, DASH.index) : this.viewState,
        DEVICE = (this.window.innerWidth < this.breakpoint ? 'm' : 'd'),
        KEY = `${DEVICE}${CURRENT_STATE.charAt(0).toUpperCase()}${CURRENT_STATE.slice(1)}`;
      this.viewState = this.viewStates[KEY];
      if (this.viewState === this.viewStates.mExpanded) {
        this.timeout(() => {
          this.viewState = this.viewStates.dCollapsed;
        }, 200);
      }
    }

    resizeThrottler() {
      if (!this.resizeTimeout) {
        this.resizeTimeout = true;
        this.timeout(() => {
          this.resizeTimeout = false;
          this.actualResizeHandler();
        }, 100);
      }
    }
  }
};