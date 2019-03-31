import { APP_BACKDROP } from './backdrop/backdrop.module';
import { APP_BACK_TO_TOP } from './back-to-top/back-to-top.module';
import { APP_FOOTER } from './footer/footer.module';
import { APP_HEADER } from './header/header.module';
import { APP_MESSAGES } from './messages/messages.module';
import { APP_SELECT } from './select/select.module';
import { APP_SIDE_MENU } from './side-menu/side-menu.module';
import { CommonTransitionsService } from './services/common-transitions.service';
import { CommonViewService } from './services/common-view.service';
import { COMMON_COMPONENT } from './common.component';
import { ToastDirective } from './directives/toast.directive';

import './common.scss';

export const APP_COMMON = angular
  .module('appCommon', [
    APP_BACKDROP,
    APP_BACK_TO_TOP,
    APP_FOOTER,
    APP_HEADER,
    APP_MESSAGES,
    APP_SELECT,
    APP_SIDE_MENU
  ])
  .service('CommonTransitions', CommonTransitionsService)
  .service('CommonView', CommonViewService)
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