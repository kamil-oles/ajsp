import { RATES_CURRENT_COMPONENT } from './rates-current.component';
import { RatesCurrentHttpService } from './services/rates-current-http.service';
import { RatesCurrentDataService } from './services/rates-current-data.service';

export const APP_RATES_CURRENT = angular
  .module('appRatesCurrent', [])
  .service('RatesCurrentData', RatesCurrentDataService)
  .service('RatesCurrentHttp', RatesCurrentHttpService)
  .component('appRatesCurrent', RATES_CURRENT_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appRates.current', {
      url: '/current',
      component: 'appRatesCurrent',
      params: {
        from: null
      },
      resolve: {
        initData: function prepareInitData(RatesCurrentData) {
          return RatesCurrentData.rates();
        }
      },
      data: {
        title: 'Kursy aktualne'
      }
    });
  })
  .name;