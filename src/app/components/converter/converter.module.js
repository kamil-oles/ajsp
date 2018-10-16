import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ConverterLocalStorageService } from './services/converter-local-storage.service';
import { converterComponent } from './converter.component';
import { appConverterCode } from './converter-code/converter-code.module';
import { appConverterForm } from './converter-form/converter-form.module';
import { appConverterRate } from './converter-rate/converter-rate.module';
import './converter.scss';

export const appConverter = angular
  .module('appConverter', [uiRouter, appConverterCode, appConverterForm, appConverterRate])
  .service('ConverterLocalStorageService', ConverterLocalStorageService)
  .component('appConverter', converterComponent)
  .config($stateProvider => {
    $stateProvider.state('appConverter', {
      url: '/converter',
      component: 'appConverter'
    });
  })
  .name;