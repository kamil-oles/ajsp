import { converterRate } from './converter-rate.component';
import './converter-rate.scss';

export const appConverterRate = angular
  .module('appConverterRate', [])
  .component('appConverterRate', converterRate)
  .name;