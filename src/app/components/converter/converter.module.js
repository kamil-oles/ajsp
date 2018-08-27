import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { converterComponent } from './converter.component';

export const appConverter = angular
  .module('appConverter', [uiRouter])
  .component('appConverter', converterComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appConverter', {
        url: '/converter',
        component: 'appConverter'
      });
  })
  .name;