import angular from 'angular';
import { headerComponent } from './header.component';
import './header.scss';

export const APP_HEADER = angular
  .module('appHeader', [])
  .component('appHeader', headerComponent)
  .name;