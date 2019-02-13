import { DB } from '../app.module';

export const COMMON_COMPONENT = {
  template: require('./common.html'),
  controller: class CommonComponentCtrl {
    constructor($scope, $timeout, $transitions, $window) {
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
        this.viewState = this.viewStates.dCollapsed;
      } else if (this.viewState === this.viewStates.dDefault && MOBILE) {
        this.viewState = this.viewStates.dCollapsed;
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
          this.viewStateDefault();
        }
      });
    }

    onViewStateChange() {
      const DASH = /-/.exec(this.viewState),
        CURRENT_STATE = DASH ? this.viewState.slice(0, DASH.index) : this.viewState,
        DEVICE = (this.window.innerWidth < this.breakpoint ? 'm' : 'd'),
        KEY = `${DEVICE}${CURRENT_STATE.charAt(0).toUpperCase()}${CURRENT_STATE.slice(1)}`;
      this.viewState = this.viewStates[KEY];
      if (this.viewState === this.viewStates.mExpanded) {
        this.viewStateDefault();
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

    viewStateDefault() {
      this.timeout(() => {
        this.viewState = this.viewStates.dCollapsed;
      }, 200);
    }
  }
};