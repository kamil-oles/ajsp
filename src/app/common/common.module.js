import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { commonComponent } from './common.component';
import { appFooter } from './footer/footer.module';
import { APP_HEADER } from './header/header.module';
import { appSelect } from './select/select.module';
import { ToastDirective } from './directives/toast.directive';
import './common.scss';

export const appCommon = angular
  .module('appCommon', [uiRouter, appFooter, APP_HEADER, appSelect])
  .component('appCommon', commonComponent)
  .directive('toast', ToastDirective)
  .config($stateProvider => {
    $stateProvider
      .state('appCommon', {
        url: '/',
        component: 'appCommon',
        redirectTo: 'appConverter'
      });
  })
  .name;