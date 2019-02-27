export class BackToTopDirective {
  constructor() {
    this.controller = BackToTopDirectiveCtrl;
    this.restrict = 'A';
    this.scope = {};
  }
}

class BackToTopDirectiveCtrl {
  constructor($element, $timeout, $window) {
    this.element = $element;
    this.timeout = $timeout;
    this.window = $window;
  }

  scrollTimeout = false;

  $onInit() {
    this.height = this.window.innerHeight;
    this.window.addEventListener('scroll', this.scrollThrottler.bind(this));
    this.element.on('click', this.scrollUp.bind(this));
  }

  actualScrollHandler() {
    this.window.scrollY > this.height ? this.toggle('hidden') : this.toggle('visible');
  }

  scrollThrottler() {
    if (!this.scrollTimeout) {
      this.scrollTimeout = true;
      this.timeout(() => {
        this.scrollTimeout = false;
        this.actualScrollHandler();
      }, 300);
    }
  }

  scrollUp() {
    this.window.scroll(0, 0);
  }

  toggle(state) {
    if (this.element.hasClass(`common-back-to-top-${state}`)) {
      this.element.toggleClass('common-back-to-top-visible common-back-to-top-hidden');
    }
  }
}