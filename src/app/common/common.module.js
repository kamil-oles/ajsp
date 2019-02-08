import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { APP_FOOTER } from './footer/footer.module';
import { APP_HEADER } from './header/header.module';
import { APP_SIDE_MENU } from './side-menu/side-menu.module';
import { appSelect } from './select/select.module';
import { COMMON_COMPONENT } from './common.component';
import { CommonMenuService } from './services/common-menu.service';
import { ToastDirective } from './directives/toast.directive';
import './common.scss';

export const appCommon = angular
  .module('appCommon', [uiRouter, APP_FOOTER, APP_HEADER, APP_SIDE_MENU, appSelect])
  .component('appCommon', COMMON_COMPONENT)
  .directive('toast', ToastDirective)
  .service('CommonMenuService', CommonMenuService)
  .config($stateProvider => {
    $stateProvider
      .state('appCommon', {
        url: '/',
        component: 'appCommon',
        redirectTo: 'appConverter'
      });
  })
  .name;