import { DB } from '../app.module';

export const COMMON_COMPONENT = {
  template: require('./common.html'),
  controller: class CommonComponentCtrl {
    constructor($element, $scope, $timeout, $transitions, $window) {
      this.body = $element.parent().parent();
      this.scope = $scope;
      this.timeout = $timeout;
      this.transitions = $transitions;
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
      this.fetchMenuData();
      this.viewState = this.viewStates.dCollapsed;
      this.window.addEventListener('resize', this.resizeThrottler.bind(this));
      this.hideMenu();
    }

    actualResizeHandler() {
      const MOBILE = (this.window.innerWidth < this.breakpoint);
      if (this.viewState === this.viewStates.mDefault && !MOBILE) {
        this.viewStateDefault(false);
      } else if (this.viewState === this.viewStates.dDefault && MOBILE) {
        this.viewStateDefault(false);
      }
    }

    fetchMenuData() {
      this.menu = JSON.parse(localStorage.getItem('menu'));
      if (!this.menu) {
        DB.collection('basic').doc('menu').get().then((querySnapshot) => {
          const DATA = querySnapshot.data();
          this.menu = DATA.menuItems;
          this.scope.$apply();
          localStorage.setItem('menu', JSON.stringify(this.menu));
        });
      }
    }

    hideMenu() {
      this.transitions.onSuccess({}, () => {
        if (this.viewState === this.viewStates.mDefault) {
          this.viewState = this.viewStates.mExpanded;
          this.viewStateDefault(true);
        }
      });
    }

    onViewStateChange() {
      const DASH = /-/.exec(this.viewState),
        CURRENT_STATE = DASH ? this.viewState.slice(0, DASH.index) : this.viewState,
        DEVICE = (this.window.innerWidth < this.breakpoint ? 'm' : 'd'),
        KEY = `${DEVICE}${CURRENT_STATE.charAt(0).toUpperCase()}${CURRENT_STATE.slice(1)}`;
      this.viewState = this.viewStates[KEY];
      if (this.viewState === this.viewStates.mDefault) {
        this.body.addClass('app-block-scroll');
      }
      if (this.viewState === this.viewStates.mExpanded) {
        this.viewStateDefault(true);
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

    viewStateDefault(delay) {
      if (delay) {
        this.timeout(() => {
          this.viewState = this.viewStates.dCollapsed;
        }, 200);
      } else {
        this.viewState = this.viewStates.dCollapsed;
      }
      this.body.removeClass('app-block-scroll');
    }
  }
};