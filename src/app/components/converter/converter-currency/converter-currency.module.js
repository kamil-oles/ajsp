import angular from 'angular';
import { converterCurrencyComponent } from './converter-currency.component';
import './converter-currency.scss';

export const appConverterCurrency = angular
  .module('appConverterCurrency', [])
  .component('appConverterCurrency', converterCurrencyComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;