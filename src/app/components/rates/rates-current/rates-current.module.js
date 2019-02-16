import angular from 'angular';

import uiRouter from '@uirouter/angularjs';

import { DB } from '../../../app.module';
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
        table: function () {
          const TABLE_HEADERS = JSON.parse(localStorage.getItem('table_current'));
          if (!TABLE_HEADERS) {
            return DB.collection('tables').doc('current').get()
              .then(function (querySnapshot) {
                const DATA = querySnapshot.data();
                localStorage.setItem('table_current', JSON.stringify(DATA));
                console.log(DATA);
                return DATA;
              });
          } else {
            return TABLE_HEADERS;
          }
        }
      }
    });
  })
  .name;