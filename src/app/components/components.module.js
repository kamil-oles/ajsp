import angular from 'angular';
import { appConverter } from './converter/converter.module';
import { APP_RATES } from './rates/rates.module';
import { ComponentsCurrenciesService } from './shared/services/components-currencies.service';
import { ComponentsDbService } from './services/components-db.service';
import { ComponentsHttpService } from './shared/services/components-http.service';

export const appComponents = angular
  .module('appComponents', [appConverter, APP_RATES])
  .service('ComponentsCurrenciesService', ComponentsCurrenciesService)
  .service('ComponentsDb', ComponentsDbService)
  .service('ComponentsHttpService', ComponentsHttpService)
  .value('base', {
    currency: { code: 'EUR' },
    url: 'http://api.nbp.pl/api/exchangerates/'
  })
  .name;