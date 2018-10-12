import angular from 'angular';
import { converterRate } from './converter-rate.component';

export const appConverterRate = angular
  .module('appConverterRate', [])
  .component('appConverterRate', converterRate)
  .name;