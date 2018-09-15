import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesHistoricalComponent } from './rates-historical.component';
import { RatesHistoricalHttpService } from './rates-historical-http.service';
import './rates-historical.scss';

export const appRatesHistorical = angular
  .module('appRatesHistorical', [uiRouter])
  .component('appRatesHistorical', ratesHistoricalComponent)
  .service('RatesHistoricalHttpService', RatesHistoricalHttpService)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.historical', {
        url: '/historical',
        component: 'appRatesHistorical',
        params: {
          code: null
        },
        resolve: {
          ratesFromLastWeek: function ($stateParams, RatesHistoricalHttpService) {
            if ($stateParams.code !== null) {
              const from = RatesHistoricalHttpService.setStartDate(),
                to = new Date();
              return RatesHistoricalHttpService.rates($stateParams.code, from, to)
                .then(response => response.data);
            }
          }
        }
      });
  })
  .name;