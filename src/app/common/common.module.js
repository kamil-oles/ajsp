import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { commonComponent } from './common.component';
import { appFooter } from './footer/footer.module';
import { appHeader } from './header/header.module';

export const appCommon = angular
  .module('appCommon', [uiRouter, appFooter, appHeader])
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