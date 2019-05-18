import { APP_CONVERTER_FORM } from './converter-form/converter-form.module';
import { APP_CONVERTER_RATE } from './converter-rate/converter-rate.module';
import { CONVERTER_COMPONENT } from './converter.component';

export const APP_CONVERTER = angular
  .module('appConverter', [APP_CONVERTER_FORM, APP_CONVERTER_RATE])
  .component('appConverter', CONVERTER_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appConverter', {
      url: '/converter',
      component: 'appConverter',
      data: { title: 'Kalkulator walutowy' }
    });
  })
  .name;