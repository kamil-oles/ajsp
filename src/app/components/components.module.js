import angular from 'angular';
import { appConverter } from './converter/converter.module';
import { appRates } from './rates/rates.module';
import { ComponentsCurrenciesService } from './shared/services/components-currencies.service';
import { ComponentsHttpService } from './shared/services/components-http.service';
import { ComponentsSortService } from './shared/services/components-sort.service';

export const appComponents = angular
  .module('appComponents', [appConverter, appRates])
  .service('ComponentsCurrenciesService', ComponentsCurrenciesService)
  .service('ComponentsHttpService', ComponentsHttpService)
  .service('ComponentsSortService', ComponentsSortService)
  .name;