import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ratesCurrentComponent } from './rates-current.component';

export const appRatesCurrent = angular
  .module('appRatesCurrent', [uiRouter])
  .component('appRatesCurrent', ratesCurrentComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appRates.current', {
        url: '/current',
        component: 'appRatesCurrent',
        resolve: {
          currentRates: function (ComponentsHttpService) {
            return ComponentsHttpService.currentRates().then(response => response.data[0]);
          }
        }
      });
  })
  .name;