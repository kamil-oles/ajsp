import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { appRatesCurrent } from './rates-current/rates-current.module';
import { appRatesHistorical } from './rates-historical/rates-historical.module';
import { ratesComponent } from './rates.component';
import './rates.scss';

export const appRates = angular
  .module('appRates', [uiRouter, appRatesCurrent, appRatesHistorical])
  .component('appRates', ratesComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates', {
        url: '/rates',
        component: 'appRates'
      });
  })
  .name;