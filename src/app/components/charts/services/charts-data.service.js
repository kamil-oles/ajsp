import differenceby from 'lodash.differenceby';
import { ChartsData } from '../classes/charts.class';

export class ChartsDataService {
  /* @ngInject */
  constructor($filter, $q, ChartsHttp) {
    this._filter = $filter;
    this._http = ChartsHttp;
    this._q = $q;
  }

  prepareData(curr, inco, data, labels) {
    const DEFER = this._q.defer();
    if (curr.from === inco.from && curr.to === inco.to) {
      const FETCH = differenceby(inco.currencies, curr.currencies, 'code');
      if (FETCH.length === 0) {
        const DATA = (curr.currencies[0].code === inco.currencies[1].code ? data.reverse() : data);
        return this._returnPromise(DEFER, DATA, labels, inco);
      } else if (FETCH.length === 1 && FETCH[0].code) {
        return this._http.getRates(FETCH[0].code, inco.from, inco.to).then(
          response => {
            DEFER.resolve(this._prepareOne(inco, data, labels, FETCH, response));
            return DEFER.promise;
          },
          error => this._returnPromise(DEFER, data, labels, inco, error)
        );
      } else if (FETCH.length === 1 && !FETCH[0].code) {
        data[1] = [];
        return this._returnPromise(DEFER, data, labels, inco);
      } else {
        const PROMISES = this._promises(inco);
        return this._q.all(PROMISES).then(
          response => {
            const PREPARED_DATA = this._prepareAll(response, labels);
            return this._returnPromise(DEFER, PREPARED_DATA.rates, PREPARED_DATA.labels, inco);
          },
          error => this._returnPromise(DEFER, data, labels, inco, error)
        );
      }
    } else {
      const PROMISES = this._promises(inco);
      return this._q.all(PROMISES).then(
        response => {
          const PREPARED_DATA = this._prepareAll(response, []);
          return this._returnPromise(DEFER, PREPARED_DATA.rates, PREPARED_DATA.labels, inco);
        },
        error => this._returnPromise(DEFER, data, labels, inco, error)
      );
    }
  }

  _prepareAll(response, labels) {
    const RATES = [[], []],
      LABELS = [];
    response.forEach((element, index) => {
      element.data.rates.forEach(el => {
        RATES[index].push(el.ask);
        if (!index && !labels.length) {
          LABELS.push(this._filter('date')(el.effectiveDate, 'dd.MM.yyyy'));
        }
      });
    });
    return {
      rates: RATES,
      labels: labels.length ? labels : LABELS
    };
  }

  _prepareOne(inco, data, labels, fetch, response) {
    const INDEX = inco.currencies.findIndex(function comparison(element) {
      return element.code === fetch[0].code;
    });
    const DATA = angular.copy(data);
    DATA[INDEX] = [];
    response.data.rates.forEach(function fillArray(element) {
      DATA[INDEX].push(element.ask);
    });
    return new ChartsData(DATA, labels, inco);
  }

  _promises(inco) {
    const PROMISES = [];
    inco.currencies.forEach(element => {
      if (element.code) {
        PROMISES.push(this._http.getRates(element.code, inco.from, inco.to));
      }
    });
    return PROMISES;
  }

  _returnPromise(defer, data, labels, inco, error) {
    defer[(error ? 'reject' : 'resolve')](new ChartsData(data, labels, inco, error));
    return defer.promise;
  }
}