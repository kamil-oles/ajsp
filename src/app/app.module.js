import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { appCommon } from './common/common.module';
import { appComponent } from './app.component';
import { appComponents } from './components/components.module';
import './app.scss';

export const app = angular
  .module('app', [uiRouter, appCommon, appComponents])
  .component('app', appComponent)
  .config($locationProvider => $locationProvider.html5Mode(true))
  .name;