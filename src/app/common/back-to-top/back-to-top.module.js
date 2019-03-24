import { BACK_TO_TOP_COMPONENT } from './back-to-top.component';
import './back-to-top.scss';

export const APP_BACK_TO_TOP = angular
  .module('appBackToTop', [])
  .component('appBackToTop', BACK_TO_TOP_COMPONENT)
  .name;