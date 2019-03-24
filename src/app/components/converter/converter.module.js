import { APP_CONVERTER_FORM } from './converter-form/converter-form.module';
import { APP_CONVERTER_RATE } from './converter-rate/converter-rate.module';
import { APP_CONVERTER_SLIDER } from './converter-slider/converter-slider.module';
import { CONVERTER_COMPONENT } from './converter.component';

import './converter.scss';

export const APP_CONVERTER = angular
  .module('appConverter', [APP_CONVERTER_FORM, APP_CONVERTER_RATE, APP_CONVERTER_SLIDER])
  .component('appConverter', CONVERTER_COMPONENT)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appConverter', {
      url: '/converter',
      component: 'appConverter'
    });
  })
  .name;