import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from '@uirouter/angularjs';
import { appCommon } from './common/common.module';
import { appComponent } from './app.component';
import { appComponents } from './components/components.module';
import './app.scss';

export const app = angular
  .module('app', [uiBootstrap, uiRouter, appCommon, appComponents])
  .component('app', appComponent)
  .config(($locationProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/converter');
  })
  .name;