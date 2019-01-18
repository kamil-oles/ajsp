import angular from 'angular';
import { FOOTER_COMPONENT } from './footer.component';
import './footer.scss';

export const APP_FOOTER = angular
  .module('appFooter', [])
  .component('appFooter', FOOTER_COMPONENT)
  .name;