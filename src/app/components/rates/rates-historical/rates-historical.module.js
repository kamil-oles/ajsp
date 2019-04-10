import moment from 'moment';

import { RatesHistoricalDataService } from './services/rates-historical-data.service';
import { RatesHistoricalHttpService } from './services/rates-historical-http.service';
import { RATES_HISTORICAL_COMPONENT } from './rates-historical.component';

export const APP_RATES_HISTORICAL = angular
  .module('appRatesHistorical', [])
  .service('RatesHistoricalData', RatesHistoricalDataService)
  .service('RatesHistoricalHttp', RatesHistoricalHttpService)
  .component('appRatesHistorical', RATES_HISTORICAL_COMPONENT)
  .config(function moduleConfig($mdDateLocaleProvider, $stateProvider) {
    $stateProvider.state('appRates.historical', {
      url: '/historical',
      component: 'appRatesHistorical',
      params: {
        code: null,
        from: null
      },
      resolve: {
        initData: function prepareInitialData($stateParams, RatesHistoricalData) {
          return RatesHistoricalData.initData($stateParams.code);
        }
      },
      data: {
        title: 'Kursy historyczne'
      }
    });
    $mdDateLocaleProvider.shortMonths = [
      'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
    ];
    $mdDateLocaleProvider.shortDays = ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    $mdDateLocaleProvider.parseDate = function parseDate(dateString) {
      moment.locale('pl');
      const M = moment(dateString, 'L', true);
      return (M.isValid() ? M.toDate() : new Date(NaN));
    };
    $mdDateLocaleProvider.formatDate = function formatDate(date) {
      moment.locale('pl');
      const M = moment(date);
      return (M.isValid() ? M.format('L') : '');
    };
  })
  .name;