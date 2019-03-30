class BackToTopComponentCtrl {
  /* @ngInject */
  constructor($element, $timeout, $window) {
    this._element = $element.children();
    this._timeout = $timeout;
    this._window = $window;
  }

  _scrollTimeout = false;

  $onInit() {
    this._window.addEventListener('scroll', this._scrollThrottler.bind(this));
    this._element.on('click', this._scrollUp.bind(this));
  }

  _actualScrollHandler() {
    this._window.scrollY > this.height ? this._toggle('hidden') : this._toggle('visible');
  }

  _scrollThrottler() {
    if (!this._scrollTimeout) {
      this._scrollTimeout = true;
      this._timeout(() => {
        this._scrollTimeout = false;
        this._actualScrollHandler();
      }, 300);
    }
  }

  _scrollUp() {
    this._window.scroll(0, 0);
  }

  _toggle(state) {
    if (this._element.hasClass(`back-to-top-${state}`)) {
      this._element.toggleClass('back-to-top-visible back-to-top-hidden');
    }
  }
}

export const BACK_TO_TOP_COMPONENT = {
  bindings: { height: '<' },
  template: require('./back-to-top.html'),
  controller: BackToTopComponentCtrl
};