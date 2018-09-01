import angular from 'angular';
import { appConverter } from './converter/converter.module';
import { ComponentsCurrenciesService } from './shared/components-currencies.service';

export const appComponents = angular
  .module('appComponents', [appConverter])
  .service('ComponentsCurrenciesService', ComponentsCurrenciesService)
  .name;