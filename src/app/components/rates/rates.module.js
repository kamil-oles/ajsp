import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesComponent } from './rates.component';

export const appRates = angular
  .module('appRates', [uiRouter])
  .component('appRates', ratesComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates', {
        url: '/rates',
        component: 'appRates'
      });
  })
  .name;