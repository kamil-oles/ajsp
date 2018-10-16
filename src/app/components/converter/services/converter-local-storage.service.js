import { Currency } from '../../shared/classes/components-classes';

export class ConverterLocalStorageService {
  getData(key) {
    const value = localStorage.getItem(key);
    if (value) {
      const local = JSON.parse(value),
        currencyModels = {
          first: () => new Currency(local.code, local.value),
          second: () => new Currency(local.code)
        };
      return currencyModels[key]();
    } else {
      const currencyModels = {
        first: () => new Currency('PLN', 1000),
        second: () => new Currency('USD')
      };
      return currencyModels[key]();
    }
  }
}