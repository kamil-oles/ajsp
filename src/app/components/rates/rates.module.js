import angular from 'angular';

import uiRouter from '@uirouter/angularjs';

import { APP_RATES_CURRENT } from './rates-current/rates-current.module';
import { appRatesHistorical } from './rates-historical/rates-historical.module';
import { appRatesTable } from './rates-table/rates-table.module';
import { RATES_COMPONENT } from './rates.component';

import './rates.scss';

export const APP_RATES = angular
  .module('appRates', [uiRouter, APP_RATES_CURRENT, appRatesHistorical, appRatesTable])
  .component('appRates', RATES_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appRates', {
      url: '/rates',
      component: 'appRates',
      redirectTo: 'appRates.current'
    });
  })
  .name;