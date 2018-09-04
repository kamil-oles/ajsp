import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ConverterCalculateService } from './shared/converter-calculate.service';
import { converterComponent } from './converter.component';
import { appConverterCurrency } from './converter-currency/converter-currency.module';

export const appConverter = angular
  .module('appConverter', [uiRouter, appConverterCurrency])
  .service('ConverterCalculateService', ConverterCalculateService)
  .component('appConverter', converterComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appConverter', {
        url: '/converter',
        component: 'appConverter'
      });
  })
  .name;