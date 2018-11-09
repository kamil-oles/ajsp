import angular from 'angular';
import { selectComponent } from './select.component';
import './select.scss';

export const appSelect = angular
  .module('appSelect', [])
  .component('appSelect', selectComponent)
  .value('EventEmitter', payload => ({ $event: payload }))
  .name;