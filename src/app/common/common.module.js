import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { commonComponent } from './common.component';
import { appFooter } from './footer/footer.module';
import { appHeader } from './header/header.module';
import { appSelect } from './select/select.module';
import './common.scss';

export const appCommon = angular
  .module('appCommon', [uiRouter, appFooter, appHeader, appSelect])
  .component('appCommon', commonComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appCommon', {
        url: '/',
        component: 'appCommon',
        redirectTo: 'appConverter'
      });
  })
  .name;