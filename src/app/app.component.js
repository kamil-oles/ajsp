import firebase from 'firebase/app';

export const APP_COMPONENT = {
  template: require('./app.html'),
  controller: class AppComponentCtrl {
    $onInit() {
      firebase.initializeApp({
        apiKey: 'AIzaSyB6Rm_TCkBZOx3iAV2QiAheSNPikmF1vZc',
        authDomain: 'currency-converter-95682.firebaseapp.com',
        projectId: 'currency-converter-95682'
      });
    }
  }
};