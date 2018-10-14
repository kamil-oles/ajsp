import { Currency } from '../../shared/classes/components-classes';

export class ConverterLocalStorageService {
  getData(key) {
    const value = localStorage.getItem(key);
    if (value) {
      const local = JSON.parse(value),
        currencyModels = {
          first: () => new Currency(local.active, local.code, local.value),
          second: () => new Currency(local.active, local.code)
        };
      return currencyModels[key]();
    } else {
      const currencyModels = {
        first: () => new Currency(true, 'PLN', 1000),
        second: () => new Currency(false, 'USD')
      };
      return currencyModels[key]();
    }
  }
}