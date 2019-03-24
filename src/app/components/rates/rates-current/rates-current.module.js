import { RATES_CURRENT_COMPONENT } from './rates-current.component';
import { RatesCurrentHttpService } from './services/rates-current-http.service';
import { RatesCurrentDataService } from './services/rates-current-data.service';

export const APP_RATES_CURRENT = angular
  .module('appRatesCurrent', [])
  .component('appRatesCurrent', RATES_CURRENT_COMPONENT)
  .service('RatesCurrentData', RatesCurrentDataService)
  .service('RatesCurrentHttp', RatesCurrentHttpService)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appRates.current', {
      url: '/current',
      component: 'appRatesCurrent',
      params: {
        from: null
      },
      resolve: {
        initialData: function (RatesCurrentData) {
          return RatesCurrentData.rates();
        }
      }
    });
  })
  .name;