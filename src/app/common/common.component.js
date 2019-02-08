export const COMMON_COMPONENT = {
  template: require('./common.html'),
  controller: class CommonComponentCtrl {
    constructor($timeout, $window) {
      this.timeout = $timeout;
      this.window = $window;
    }

    breakpoint = 960;
    resizeTimeout = false;

    uiStates = {
      dCollapsed: 'default',
      dDefault: 'collapsed-d',
      mDefault: 'expanded-m',
      mExpanded: 'collapsed-m'
    };

    $onInit() {
      this.uiState = this.uiStates.dCollapsed;
      this.window.addEventListener('resize', this.resizeThrottler.bind(this));
    }

    actualResizeHandler() {
      const WIDTH = this.window.innerWidth;
      if (this.uiState === this.uiStates.mDefault && WIDTH >= this.breakpoint) {
        this.uiState = this.uiStates.dCollapsed;
      } else if (this.uiState === this.uiStates.dDefault && WIDTH < this.breakpoint) {
        this.uiState = this.uiStates.dCollapsed;
      }
    }

    onUiStateChange() {
      const DASH = /-/.exec(this.uiState),
        CURRENT_STATE = DASH ? this.uiState.slice(0, DASH.index) : this.uiState,
        MOBILE = (this.window.innerWidth < this.breakpoint ? 'm' : 'd'),
        KEY = `${MOBILE}${CURRENT_STATE.charAt(0).toUpperCase()}${CURRENT_STATE.slice(1)}`;
      this.uiState = this.uiStates[KEY];
      if (this.uiState === this.uiStates.mExpanded) {
        this.timeout(() => {
          this.uiState = this.uiStates.dCollapsed;
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