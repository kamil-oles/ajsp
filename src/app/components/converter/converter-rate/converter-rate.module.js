import { CONVERTER_RATE } from './converter-rate.component';
import './converter-rate.scss';

export const APP_CONVERTER_RATE = angular
  .module('appConverterRate', [])
  .component('appConverterRate', CONVERTER_RATE)
  .name;