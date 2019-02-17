import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { RATES_CURRENT_COMPONENT } from './rates-current.component';

export const APP_RATES_CURRENT = angular
  .module('appRatesCurrent', [uiRouter])
  .component('appRatesCurrent', RATES_CURRENT_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appRates.current', {
      url: '/current',
      component: 'appRatesCurrent',
      resolve: {
        currentRates: function (ComponentsHttpService) {
          return ComponentsHttpService.fetchCurrentRates();
        },
        table: function (ComponentsDbService) {
          return ComponentsDbService.getData('tables', 'current');
        }
      }
    });
  })
  .name;