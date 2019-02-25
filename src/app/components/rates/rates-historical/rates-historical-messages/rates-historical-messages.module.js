import { ratesHistoricalMessagesComponent } from './rates-historical-messages.component';

export const appRatesHistoricalMessages = angular
  .module('appRatesHistoricalMessages', [])
  .component('appRatesHistoricalMessages', ratesHistoricalMessagesComponent)
  .name;