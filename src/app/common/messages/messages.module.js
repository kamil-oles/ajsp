import { MESSAGES_COMPONENT } from './messages.component';

export const APP_MESSAGES = angular
  .module('appMessages', [])
  .component('appMessages', MESSAGES_COMPONENT)
  .name;