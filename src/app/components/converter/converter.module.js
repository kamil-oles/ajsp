import { APP_CONVERTER_FORM } from './converter-form/converter-form.module';
import { APP_CONVERTER_RATE } from './converter-rate/converter-rate.module';
import { APP_CONVERTER_SLIDER } from './converter-slider/converter-slider.module';
import { CONVERTER_COMPONENT } from './converter.component';
import { ConverterHttpService } from './services/converter-http.service';

import './converter.scss';

export const APP_CONVERTER = angular
  .module('appConverter', [APP_CONVERTER_FORM, APP_CONVERTER_RATE, APP_CONVERTER_SLIDER])
  .component('appConverter', CONVERTER_COMPONENT)
  .service('ConverterHttp', ConverterHttpService)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appConverter', {
      url: '/converter',
      component: 'appConverter',
      resolve: {
        currencies: function (ComponentsDb) {
          return ComponentsDb.getData('basic', 'currencies');
        },
      }
    });
  })
  .name;