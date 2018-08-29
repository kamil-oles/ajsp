import angular from 'angular';
import { converterCurrencyComponent } from './converter-currency.component';

export const appConverterCurrency = angular
  .module('appConverterCurrency', [])
  .component('appConverterCurrency', converterCurrencyComponent)
  .name;