import angular from 'angular';
import { footerComponent } from './footer.component';
import './footer.scss';

export const appFooter = angular
  .module('appFooter', [])
  .component('appFooter', footerComponent)
  .name;