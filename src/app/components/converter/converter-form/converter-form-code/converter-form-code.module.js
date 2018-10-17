import angular from 'angular';
import { converterFormCodeComponent } from './converter-form-code.component';
import './converter-form-code.scss';

export const appConverterFormCode = angular
  .module('appConverterFormCode', [])
  .component('appConverterFormCode', converterFormCodeComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;