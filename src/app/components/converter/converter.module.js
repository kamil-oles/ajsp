import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ConverterCalculateService } from './services/converter-calculate.service';
import { ConverterLocalStorageService } from './services/converter-local-storage.service';
import { ConverterValidationService } from './services/converter-validation.service';
import { converterComponent } from './converter.component';
import { appConverterCurrency } from './converter-currency/converter-currency.module';
import { appConverterRate } from './converter-rate/converter-rate.module';
import './converter.scss';

export const appConverter = angular
  .module('appConverter', [uiRouter, appConverterCurrency, appConverterRate])
  .service('ConverterCalculateService', ConverterCalculateService)
  .service('ConverterLocalStorageService', ConverterLocalStorageService)
  .service('ConverterValidationService', ConverterValidationService)
  .component('appConverter', converterComponent)
  .config($stateProvider => {
    $stateProvider
      .state('appConverter', {
        url: '/converter',
        component: 'appConverter'
      });
  })
  .name;