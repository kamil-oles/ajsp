import { APP_CONVERTER } from './converter/converter.module';
import { APP_RATES } from './rates/rates.module';

export const appComponents = angular
  .module('appComponents', [APP_CONVERTER, APP_RATES])
  .value('base', {
    currency: 'EUR',
    url: 'http://api.nbp.pl/api/exchangerates/'
  })
  .name;