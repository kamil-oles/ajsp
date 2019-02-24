import angular from 'angular';
import { SUBMIT_BUTTON_COMPONENT } from './submit-button.component';
import './submit-button.scss';

export const APP_SUBMIT_BUTTON = angular
  .module('appSubmitButton', [])
  .component('appSubmitButton', SUBMIT_BUTTON_COMPONENT)
  .name;