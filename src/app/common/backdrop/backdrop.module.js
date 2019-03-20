import { BACKDROP_COMPONENT } from './backdrop.component';
import './backdrop.scss';

export const APP_BACKDROP = angular
  .module('appBackdrop', [])
  .component('appBackdrop', BACKDROP_COMPONENT)
  .name;