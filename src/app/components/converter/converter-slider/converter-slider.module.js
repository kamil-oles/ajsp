import { CONVERTER_SLIDER } from './converter-slider.component';
import './converter-slider.scss';

export const APP_CONVERTER_SLIDER = angular
  .module('appConverterSlider', [])
  .component('appConverterSlider', CONVERTER_SLIDER)
  .name;