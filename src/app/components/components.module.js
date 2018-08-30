import angular from 'angular';
import { appConverter } from './converter/converter.module';
import { ComponentsService } from './components.service';

export const appComponents = angular
  .module('appComponents', [appConverter])
  .service('ComponentsService', ComponentsService)
  .name;