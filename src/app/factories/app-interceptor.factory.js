export const APP_INTERCEPTOR_FACTORY = function ($interval, $timeout) {
  let requestArray = [];

  function clearArray(array, url) {
    const INDEX = array.indexOf(url);
    array.splice(INDEX, 1);
    return array;
  }

  function showLoader(url) {
    if (requestArray.indexOf(url) !== -1) {
      console.log('---------LOADER!!!!');
    }
    const INTERVAL = $interval(function checkRequestArray() {
      if (requestArray.length === 0) {
        console.log('---------HIDE LOADER!!!');
        $interval.cancel(INTERVAL);
      }
    }, 500);
  }

  return {
    'request': function (config) {
      requestArray.push(config.url);
      $timeout(function loader() {
        showLoader(config.url);
      }, 1500);
      return config;
    },
    'response': function (response) {
      requestArray = clearArray(requestArray, response.config.url);
      return response;
    }
  };
};