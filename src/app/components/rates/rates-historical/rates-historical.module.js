import moment from 'moment';

import { RATES_HISTORICAL_COMPONENT } from './rates-historical.component';
import { RatesHistoricalDataService } from './services/rates-historical-data.service';
import { RatesHistoricalHttpService } from './services/rates-historical-http.service';

export const APP_RATES_HISTORICAL = angular
  .module('appRatesHistorical', [])
  .component('appRatesHistorical', RATES_HISTORICAL_COMPONENT)
  .service('RatesHistoricalData', RatesHistoricalDataService)
  .service('RatesHistoricalHttp', RatesHistoricalHttpService)
  .config(function moduleConfig($mdDateLocaleProvider, $stateProvider) {
    $stateProvider.state('appRates.historical', {
      url: '/historical',
      component: 'appRatesHistorical',
      params: {
        code: null,
        from: null
      },
      resolve: {
        initialData: function ($stateParams, RatesHistoricalData) {
          return RatesHistoricalData.initialData($stateParams.code);
        }
      }
    });
    $mdDateLocaleProvider.shortMonths = [
      'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
    ];
    $mdDateLocaleProvider.shortDays = ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    $mdDateLocaleProvider.parseDate = function (dateString) {
      moment.locale('pl');
      const M = moment(dateString, 'L', true);
      return (M.isValid() ? M.toDate() : new Date(NaN));
    };
    $mdDateLocaleProvider.formatDate = function (date) {
      moment.locale('pl');
      const M = moment(date);
      return (M.isValid() ? M.format('L') : '');
    };
  })
  .name;