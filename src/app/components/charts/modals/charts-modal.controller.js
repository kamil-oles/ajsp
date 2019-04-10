import * as currencies from '../../../data/currencies.json';

/* @ngInject */
export const CHARTS_MODAL_CTRL = function chartsModalCtrl($mdDialog, selected) {
  const SELECTED = selected,
    CURRENCIES = _prepareData(currencies.data),
    _CURRENCIES_LENGTH = CURRENCIES.length;
  let _checkboxesDisabled = false;

  function close() {
    const CODES = [];
    for (let i = 0; i < _CURRENCIES_LENGTH; i++) {
      if (CURRENCIES[i].checked) {
        CODES.push(CURRENCIES[i].code);
      }
      if (CODES.length === 3) {
        break;
      }
    }
    $mdDialog.hide(CODES);
  }

  function disableCheckboxes() {
    let counter = 0;
    for (let i = 0; i < _CURRENCIES_LENGTH; i++) {
      counter = CURRENCIES[i].checked ? counter + 1 : counter;
      if (counter === 3) {
        _loop(true);
        break;
      } else if (_checkboxesDisabled) {
        _loop(false);
      }
    }
  }

  function _loop(disable) {
    CURRENCIES.forEach(function callback(element) {
      element.disabled = (disable ? !element.checked : false);
    });
    _checkboxesDisabled = disable;
  }

  function _prepareData(data) {
    const ARRAY = [],
      COPY = angular.copy(data);
    for (let key in COPY) {
      ARRAY.push(...COPY[key].items);
    }
    ARRAY.some(function callback(element) {
      if (element.code === SELECTED) {
        element.checked = true;
        element.disabled = true;
        return true;
      } else {
        return false;
      }
    });
    return ARRAY;
  }

  angular.extend(this, {
    close: close,
    currencies: CURRENCIES,
    disableCheckboxes: disableCheckboxes,
    selected: SELECTED
  });
};