import angular from 'angular';
import { converterFormComponent } from './converter-form.component';
import { ConverterFormCalculateService } from './services/converter-form-calculate.service';
import { ConverterFormValidationService } from './services/converter-form-validation.service';
import './converter-form.scss';

export const appConverterForm = angular
  .module('appConverterForm', [])
  .component('appConverterForm', converterFormComponent)
  .service('ConverterFormCalculateService', ConverterFormCalculateService)
  .service('ConverterFormValidationService', ConverterFormValidationService)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;