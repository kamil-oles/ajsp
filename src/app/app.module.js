import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';

import firebase from 'firebase/app';
import uiRouter from '@uirouter/angularjs';
import 'firebase/firestore';

import { APP_COMMON } from './common/common.module';
import { appComponent } from './app.component';
import { appComponents } from './components/components.module';

import './app.scss';

firebase.initializeApp({
  apiKey: 'AIzaSyB6Rm_TCkBZOx3iAV2QiAheSNPikmF1vZc',
  authDomain: 'currency-converter-95682.firebaseapp.com',
  projectId: 'currency-converter-95682'
});

export const DB = firebase.firestore();

export const app = angular
  .module('app', ['ngMessages', 'ngMaterial', uiRouter, APP_COMMON, appComponents])
  .component('app', appComponent)
  .config(($locationProvider, $mdThemingProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/converter');
    $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('lime');
  })
  .name;