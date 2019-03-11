import { CONVERTER_SLIDER } from './converter-slider.component';
import { ConverterSliderDataService } from './services/converter-slider-data.service';
import { ConverterSliderHttpService } from './services/converter-slider-http.service';
import './converter-slider.scss';

export const APP_CONVERTER_SLIDER = angular
  .module('appConverterSlider', [])
  .component('appConverterSlider', CONVERTER_SLIDER)
  .service('ConverterSliderData', ConverterSliderDataService)
  .service('ConverterSliderHttp', ConverterSliderHttpService)
  .name;