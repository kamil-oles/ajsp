import { APP_BACKDROP } from './backdrop/backdrop.module';
import { APP_FILTER } from './filter/filter.module';
import { APP_FOOTER } from './footer/footer.module';
import { APP_HEADER } from './header/header.module';
import { APP_MESSAGES } from './messages/messages.module';
import { APP_SELECT } from './select/select.module';
import { APP_SIDE_MENU } from './side-menu/side-menu.module';
import { CommonDateService } from './services/common-date.service';
import { CommonTransitionsService } from './services/common-transitions.service';
import { CommonViewService } from './services/common-view.service';
import { COMMON_COMPONENT } from './common.component';
import { DOT_2_COMMA_FILTER } from './filters/dot-to-comma.filter';
import { ToastDirective } from './directives/toast.directive';

import './common.scss';

export const APP_COMMON = angular
  .module('appCommon', [
    APP_BACKDROP,
    APP_FILTER,
    APP_FOOTER,
    APP_HEADER,
    APP_MESSAGES,
    APP_SELECT,
    APP_SIDE_MENU
  ])
  .service('CommonDate', CommonDateService)
  .service('CommonTransitions', CommonTransitionsService)
  .service('CommonView', CommonViewService)
  .filter('dot2Comma', function filterFactory() {
    return DOT_2_COMMA_FILTER;
  })
  .directive('toast', ToastDirective)
  .component('appCommon', COMMON_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appCommon', {
      url: '/',
      component: 'appCommon',
      redirectTo: 'appConverter'
    });
  })
  .name;