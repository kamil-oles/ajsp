import { RATES_CURRENT_COMPONENT } from './rates-current.component';
import { RatesCurrentHttpService } from './services/rates-current-http.service';

export const APP_RATES_CURRENT = angular
  .module('appRatesCurrent', [])
  .component('appRatesCurrent', RATES_CURRENT_COMPONENT)
  .service('RatesCurrentHttp', RatesCurrentHttpService)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appRates.current', {
      url: '/current',
      component: 'appRatesCurrent',
      resolve: {
        initialData: function (RatesCurrentHttp) {
          return RatesCurrentHttp.rates();
        },
        table: function (ComponentsDb) {
          return ComponentsDb.getData('tables', 'current');
        }
      }
    });
  })
  .name;