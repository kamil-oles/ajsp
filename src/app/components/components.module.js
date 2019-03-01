import { APP_CONVERTER } from './converter/converter.module';
import { APP_RATES } from './rates/rates.module';
import { ComponentsDbService } from './services/components-db.service';

export const appComponents = angular
  .module('appComponents', [APP_CONVERTER, APP_RATES])
  .service('ComponentsDb', ComponentsDbService)
  .value('base', {
    currency: 'EUR',
    url: 'http://api.nbp.pl/api/exchangerates/'
  })
  .name;