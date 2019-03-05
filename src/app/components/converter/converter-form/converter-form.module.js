import { CONVERTER_FORM_COMPONENT } from './converter-form.component';
import { ConverterFormCalculateService } from './services/converter-form-calculate.service';
import { ConverterFormFormatterDirective } from './directives/converter-form-formatter.directive';
import { ConverterFormHttpService } from './services/converter-form-http.service';
import { ConverterFormStorageService } from './services/converter-form-storage.service';
import { ConverterFormValidationService } from './services/converter-form-validation.service';

import './converter-form.scss';

export const APP_CONVERTER_FORM = angular
  .module('appConverterForm', [])
  .component('appConverterForm', CONVERTER_FORM_COMPONENT)
  .directive('ConverterFormFormatter', ConverterFormFormatterDirective)
  .service('ConverterFormCalculate', ConverterFormCalculateService)
  .service('ConverterFormHttp', ConverterFormHttpService)
  .service('ConverterFormStorage', ConverterFormStorageService)
  .service('ConverterFormValidation', ConverterFormValidationService)
  .name;