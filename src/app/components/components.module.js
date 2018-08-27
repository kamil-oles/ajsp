import angular from 'angular';
import { appConverter } from './converter/converter.module';

export const appComponents = angular
  .module('appComponents', [appConverter])
  .name;