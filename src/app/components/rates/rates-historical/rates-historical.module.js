import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesHistoricalComponent } from './rates-historical.component';
import './rates-historical.scss';

export const appRatesHistorical = angular
  .module('appRatesHistorical', [uiRouter])
  .component('appRatesHistorical', ratesHistoricalComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.historical', {
        url: '/historical',
        component: 'appRatesHistorical',
        params: {
          code: null
        },
        resolve: {
          lastWeekRates: function ($stateParams, ComponentsHttpService) {
            return ComponentsHttpService.fetchHistoricalRates($stateParams.code);
          }
        }
      });
  })
  .name;