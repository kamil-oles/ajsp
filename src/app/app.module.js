import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';

import firebase from 'firebase/app';
import 'firebase/firestore';
import uiRouter from '@uirouter/angularjs';

import * as menu from './data/menu.json';
import { APP_COMMON } from './common/common.module';
import { APP_COMPONENT } from './app.component';
import { appComponents } from './components/components.module';
import { APP_INTERCEPTOR_FACTORY } from './factories/app-interceptor.factory';

import './app.scss';

firebase.initializeApp({
  apiKey: 'AIzaSyB6Rm_TCkBZOx3iAV2QiAheSNPikmF1vZc',
  authDomain: 'currency-converter-95682.firebaseapp.com',
  projectId: 'currency-converter-95682'
});

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
  .value('menu', menu.data)
  .config(($httpProvider, $locationProvider, $mdThemingProvider, $urlRouterProvider) => {
    $httpProvider.interceptors.push('appInterceptor');
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/converter');
    $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('lime');
  })
  .name;