import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { appRatesCurrent } from './rates-current/rates-current.module';
import { appRatesHistorical } from './rates-historical/rates-historical.module';
import { ratesComponent } from './rates.component';
import { RatesSortService } from './shared/rates-sort.service';
import './rates.scss';

export const appRates = angular
  .module('appRates', [uiRouter, appRatesCurrent, appRatesHistorical])
  .service('RatesSortService', RatesSortService)
  .component('appRates', ratesComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates', {
        url: '/rates',
        component: 'appRates'
      });
  })
  .name;