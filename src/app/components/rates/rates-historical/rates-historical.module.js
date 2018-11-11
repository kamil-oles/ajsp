import angular from 'angular';
import moment from 'moment';
import uiRouter from '@uirouter/angularjs';
import {
  appRatesHistoricalMessages
} from './rates-historical-messages/rates-historical-messages.module';
import { ratesHistoricalComponent } from './rates-historical.component';
import './rates-historical.scss';

export const appRatesHistorical = angular
  .module('appRatesHistorical', [uiRouter, appRatesHistoricalMessages])
  .component('appRatesHistorical', ratesHistoricalComponent)
  .config(($mdDateLocaleProvider, $stateProvider) => {
    $stateProvider.state('appRates.historical', {
      url: '/historical',
      component: 'appRatesHistorical',
      params: {
        code: null
      },
      resolve: {
        lastWeekRates: function ($stateParams, ComponentsHttpService) {
          return ComponentsHttpService.fetchHistoricalRates($stateParams.code);
        }
      }
    });
    $mdDateLocaleProvider.shortMonths = [
      'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
    ];
    $mdDateLocaleProvider.shortDays = ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    $mdDateLocaleProvider.parseDate = (dateString) => {
      moment.locale('pl');
      const m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = (date) => {
      moment.locale('pl');
      const m = moment(date);
      return m.isValid() ? m.format('L') : '';
    };
  })
  .name;