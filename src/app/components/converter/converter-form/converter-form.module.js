import { CONVERTER_FORM_COMPONENT } from './converter-form.component';
import { ConverterFormCalculateService } from './services/converter-form-calculate.service';
import { ConverterFormFormatterDirective } from './directives/converter-form-formatter.directive';
import { ConverterFormFormatterService } from './services/converter-form-formatter.service';
import { ConverterFormGeneralService } from './services/converter-form-general.service';
import { ConverterFormHttpService } from './services/converter-form-http.service';
import { ConverterFormStorageService } from './services/converter-form-storage.service';

import './converter-form.scss';

export const APP_CONVERTER_FORM = angular
  .module('appConverterForm', [])
  .component('appConverterForm', CONVERTER_FORM_COMPONENT)
  .directive('converterFormFormatter', ConverterFormFormatterDirective)
  .service('ConverterFormCalculate', ConverterFormCalculateService)
  .service('ConverterFormFormatter', ConverterFormFormatterService)
  .service('ConverterFormGeneral', ConverterFormGeneralService)
  .service('ConverterFormHttp', ConverterFormHttpService)
  .service('ConverterFormStorage', ConverterFormStorageService)
  .name;