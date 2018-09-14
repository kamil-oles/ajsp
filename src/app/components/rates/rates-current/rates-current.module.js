import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { RatesCurrentHttpService } from './rates-current-http.service';
import { ratesCurrentComponent } from './rates-current.component';

export const appRatesCurrent = angular
  .module('appRatesCurrent', [uiRouter])
  .component('appRatesCurrent', ratesCurrentComponent)
  .service('RatesCurrentHttpService', RatesCurrentHttpService)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.current', {
        url: '/current',
        component: 'appRatesCurrent',
        resolve: {
          currentRates: function (RatesCurrentHttpService) {
            return RatesCurrentHttpService.currentRates().then(response => {
              return RatesCurrentHttpService.prepareRates(response.data[0]);
            });
          }
        }
      });
  })
  .name;