import angular from 'angular';

import moment from 'moment';
import uiRouter from '@uirouter/angularjs';

import {
  appRatesHistoricalMessages
} from './rates-historical-messages/rates-historical-messages.module';
import { RATES_HISTORICAL_COMPONENT } from './rates-historical.component';
import { RatesHistoricalHttpService } from './services/rates-historical.service';

import './rates-historical.scss';

export const APP_RATES_HISTORICAL = angular
  .module('appRatesHistorical', [uiRouter, appRatesHistoricalMessages])
  .component('appRatesHistorical', RATES_HISTORICAL_COMPONENT)
  .service('RatesHistoricalHttp', RatesHistoricalHttpService)
  .config(function moduleConfig($mdDateLocaleProvider, $stateProvider) {
    $stateProvider.state('appRates.historical', {
      url: '/historical',
      component: 'appRatesHistorical',
      params: {
        code: null
      },
      resolve: {
        currencies: function (ComponentsDb) {
          return ComponentsDb.getData('basic', 'currencies');
        },
        initialData: function ($stateParams, RatesHistoricalHttp) {
          return RatesHistoricalHttp.initialData($stateParams.code);
        },
        table: function (ComponentsDb) {
          return ComponentsDb.getData('tables', 'historical');
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