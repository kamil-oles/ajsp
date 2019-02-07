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
      dCollapsed: 'desktop-collapsed',
      default: 'default',
      mExpanded: 'mobile-expanded',
      mCollapsed: 'mobile-collapsed'
    };

    $onInit() {
      this.uiState = this.uiStates.default;
      this.window.addEventListener('resize', this.resizeThrottler.bind(this));
    }

    actualResizeHandler() {
      if (this.uiState === this.uiStates.mExpanded) {
        if (this.window.innerWidth >= this.breakpoint) {
          this.uiState = this.uiStates.default;
        }
      } else if (this.uiState === this.uiStates.dCollapsed) {
        if (this.window.innerWidth < this.breakpoint) {
          this.uiState = this.uiStates.default;
        }
      }
    }

    onMenuStateChange() {
      const MOBILE = (this.window.innerWidth < this.breakpoint);
      if (MOBILE && this.uiState === this.uiStates.default) {
        this.uiState = this.uiStates.mExpanded;
      } else if (MOBILE && this.uiState === this.uiStates.mExpanded) {
        this.uiState = this.uiStates.mCollapsed;
        this.timeout(() => {
          this.uiState = this.uiStates.default;
        }, 200);
      } else if (!MOBILE && this.uiState === this.uiStates.default) {
        this.uiState = this.uiStates.dCollapsed;
      } else if (!MOBILE && this.uiState === this.uiStates.dCollapsed) {
        this.uiState = this.uiStates.default;
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