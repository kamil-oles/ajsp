import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';

import firebase from 'firebase/app';
import 'firebase/firestore';
import uiRouter from '@uirouter/angularjs';

import { APP_COMMON } from './common/common.module';
import { APP_COMPONENT } from './app.component';
import { appComponents } from './components/components.module';
import { APP_INTERCEPTOR_FACTORY } from './factories/app-interceptor.factory';

import './app.scss';

angular
  .module('app', ['ngMessages', 'ngMaterial', uiRouter, APP_COMMON, appComponents])
  .component('app', APP_COMPONENT)
  .factory('appInterceptor', APP_INTERCEPTOR_FACTORY)
  .value('eventEmitter', function (payload) {
    return { $event: payload };
  })
  .value('firestore', function firestore() {
    return firebase.firestore();
  })
  .config(($httpProvider, $locationProvider, $mdThemingProvider, $urlRouterProvider) => {
    $httpProvider.interceptors.push('appInterceptor');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/converter');
    $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('lime');
  })
  .name;