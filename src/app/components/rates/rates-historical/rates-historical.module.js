import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesHistoricalComponent } from './rates-historical.component';

export const appRatesHistorical = angular
  .module('appRatesHistorical', [uiRouter])
  .component('appRatesHistorical', ratesHistoricalComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.historical', {
        url: '/historical',
        component: 'appRatesHistorical'
      });
  })
  .name;