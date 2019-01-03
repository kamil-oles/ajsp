import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { ConverterLocalStorageService } from './services/converter-local-storage.service';
import { converterComponent } from './converter.component';
import { appConverterForm } from './converter-form/converter-form.module';
import { appConverterRate } from './converter-rate/converter-rate.module';
import './converter.scss';

export const appConverter = angular
  .module('appConverter', [uiRouter, appConverterForm, appConverterRate])
  .service('ConverterLocalStorageService', ConverterLocalStorageService)
  .component('appConverter', converterComponent)
  .config($stateProvider => {
    $stateProvider.state('appConverter', {
      url: '/converter',
      component: 'appConverter',
      // lazyLoad: ($transitions$) => {
      //   const $ocLazyLoad = $transitions$.injector().get('$ocLazyLoad');
      //   return require
      // }
    });
  })
  .name;