import angular from 'angular';
import 'angular-messages';
import 'angular-material';

import uiRouter from '@uirouter/angularjs';

import * as menu from './data/menu.json';
import { APP_COMMON } from './common/common.module';
import { APP_COMPONENT } from './app.component';
import { APP_COMPONENTS } from './components/components.module';
import { APP_INTERCEPTOR_FACTORY } from './factories/app-interceptor.factory';

import './app.scss';

angular
  .module('app', ['ngMessages', 'ngMaterial', uiRouter, APP_COMMON, APP_COMPONENTS])
  .factory('appInterceptor', APP_INTERCEPTOR_FACTORY)
  .value('eventEmitter', function valueSetter(payload) {
    return { $event: payload };
  })
  .value('menu', menu.data)
  .component('app', APP_COMPONENT)
  .config(function moduleConfig(
    $httpProvider,
    $locationProvider,
    $mdThemingProvider,
    $urlRouterProvider
  ) {
    $httpProvider.interceptors.push('appInterceptor');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/converter');
    $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('lime');
  })
  .name;