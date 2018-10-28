import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesCurrentComponent } from './rates-current.component';
import { RatesCurrentHeadersService } from './services/rates-current-headers.service';
import './rates-current.scss';

export const appRatesCurrent = angular
  .module('appRatesCurrent', [uiRouter])
  .service('RatesCurrentHeadersService', RatesCurrentHeadersService)
  .component('appRatesCurrent', ratesCurrentComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.current', {
        url: '/current',
        component: 'appRatesCurrent',
        resolve: {
          currentRates: function (ComponentsHttpService) {
            return ComponentsHttpService.fetchCurrentRates();
          }
        }
      });
  })
  .name;