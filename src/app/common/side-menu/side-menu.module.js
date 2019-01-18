import angular from 'angular';
import { SIDE_MENU_COMPONENT } from './side-menu.component';
import './side-menu.scss';

export const APP_SIDE_MENU = angular
  .module('appSideMenu', [])
  .component('appSideMenu', SIDE_MENU_COMPONENT)
  .name;