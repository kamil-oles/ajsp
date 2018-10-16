import angular from 'angular';
import { converterCodeComponent } from './converter-code.component';
import './converter-code.scss';

export const appConverterCode = angular
  .module('appConverterCode', [])
  .component('appConverterCode', converterCodeComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;