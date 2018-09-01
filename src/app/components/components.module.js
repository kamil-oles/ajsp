import angular from 'angular';
import { appConverter } from './converter/converter.module';
import { ComponentsCurrenciesService } from './shared/components-currencies.service';
import { ComponentsHttpService } from './shared/components-http.service';

export const appComponents = angular
  .module('appComponents', [appConverter])
  .service('ComponentsCurrenciesService', ComponentsCurrenciesService)
  .service('ComponentsHttpService', ComponentsHttpService)
  .name;