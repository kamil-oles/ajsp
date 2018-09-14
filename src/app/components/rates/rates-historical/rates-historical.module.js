import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesHistoricalComponent } from './rates-historical.component';
import { RatesHistoricalHttpService } from './rates-historical-http.service';

export const appRatesHistorical = angular
  .module('appRatesHistorical', [uiRouter])
  .component('appRatesHistorical', ratesHistoricalComponent)
  .service('RatesHistoricalHttpService', RatesHistoricalHttpService)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.historical', {
        url: '/historical',
        component: 'appRatesHistorical'
      });
  })
  .name;