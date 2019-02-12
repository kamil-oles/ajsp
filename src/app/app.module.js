import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';

import firebase from 'firebase/app';
import uiRouter from '@uirouter/angularjs';
import 'firebase/firestore';

import { appCommon } from './common/common.module';
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
  .module('app', ['ngMessages', 'ngMaterial', uiRouter, appCommon, appComponents])
  .component('app', appComponent)
  .config(($locationProvider, $mdThemingProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/converter');
    $mdThemingProvider.definePalette('ultra_violet', {
      '50': 'ECEAF1',
      '100': 'CFCADD',
      '200': 'B0A6C6',
      '300': '9082AF',
      '400': '78689E',
      '500': '604D8D',
      '600': '584685',
      '700': '4E3D7A',
      '800': '443470',
      '900': '33255D',
      'A100': 'B8A1FF',
      'A200': '916EFF',
      'A400': '6B3BFF',
      'A700': '5722FF',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
      'contrastLightColors': undefined
    });
    $mdThemingProvider.theme('default').primaryPalette('ultra_violet');
  })
  .name;