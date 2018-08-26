import angular from 'angular';
import { headerComponent } from './header.component';
import './header.scss';

export const appHeader = angular
  .module('appHeader', [])
  .component('appHeader', headerComponent)
  .name;