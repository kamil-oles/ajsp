import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { appRatesCurrent } from './rates-current/rates-current.module';
import { appRatesHistorical } from './rates-historical/rates-historical.module';
import { appRatesTable } from './rates-table/rates-table.module';
import { RATES_COMPONENT } from './rates.component';

export const appRates = angular
  .module('appRates', [uiRouter, appRatesCurrent, appRatesHistorical, appRatesTable])
  .component('appRates', RATES_COMPONENT)
  .config($stateProvider => {
    $stateProvider
      .state('appRates', {
        url: '/rates',
        component: 'appRates',
        redirectTo: 'appRates.current'
      });
  })
  .name;