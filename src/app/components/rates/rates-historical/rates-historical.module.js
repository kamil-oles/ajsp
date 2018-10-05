import angular from 'angular';
import moment from 'moment';
import uiRouter from '@uirouter/angularjs';
import { ratesHistoricalComponent } from './rates-historical.component';
import './rates-historical.scss';

export const appRatesHistorical = angular
  .module('appRatesHistorical', [uiRouter])
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
    $mdDateLocaleProvider.formatDate = (date) => {
      moment.locale('pl');
      const m = moment(date);
      return m.isValid() ? m.format('L') : '';
    };
  })
  .name;