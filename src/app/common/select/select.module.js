import angular from 'angular';
import { SELECT_COMPONENT } from './select.component';
import './select.scss';

export const APP_SELECT = angular
  .module('appSelect', [])
  .component('appSelect', SELECT_COMPONENT)
  .name;