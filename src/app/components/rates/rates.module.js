import * as headers from '../../data/tables.json';
import { APP_RATES_CURRENT } from './rates-current/rates-current.module';
import { APP_RATES_HISTORICAL } from './rates-historical/rates-historical.module';
import { APP_RATES_TABLE } from './rates-table/rates-table.module';
import { RATES_COMPONENT } from './rates.component';

import './rates.scss';

export const APP_RATES = angular
  .module('appRates', [APP_RATES_CURRENT, APP_RATES_HISTORICAL, APP_RATES_TABLE])
  .value('headers', headers.data)
  .component('appRates', RATES_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appRates', {
      url: '/rates',
      component: 'appRates',
      redirectTo: 'appRates.current'
    });
  })
  .name;