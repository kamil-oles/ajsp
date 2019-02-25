import { HEADER_COMPONENT } from './header.component';
import './header.scss';

export const APP_HEADER = angular
  .module('appHeader', [])
  .component('appHeader', HEADER_COMPONENT)
  .name;