import angular from 'angular';
import { appConverter } from './converter/converter.module';
import { appRates } from './rates/rates.module';
import { ComponentsCurrenciesService } from './shared/components-currencies.service';
import { ComponentsHttpService } from './shared/components-http.service';

export const appComponents = angular
  .module('appComponents', [appConverter, appRates])
  .service('ComponentsCurrenciesService', ComponentsCurrenciesService)
  .service('ComponentsHttpService', ComponentsHttpService)
  .name;