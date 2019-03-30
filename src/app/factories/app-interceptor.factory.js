/* @ngInject */
export const APP_INTERCEPTOR_FACTORY = function interceptorFactory(
  $interval,
  $q,
  $rootScope,
  $timeout
) {
  let requestArray = [];

  function clearArray(array, url) {
    const INDEX = array.indexOf(url);
    array.splice(INDEX, 1);
    return array;
  }

  function hideToast() {
    $rootScope.$broadcast('hideToast');
  }

  function showLoader(url) {
    if (requestArray.indexOf(url) !== -1) {
      $rootScope.$broadcast('loader', true);
    }
    const INTERVAL = $interval(function checkRequestArray() {
      if (requestArray.length === 0) {
        $rootScope.$broadcast('loader', false);
        $interval.cancel(INTERVAL);
      }
    }, 500);
  }

  return {
    'request': function requestInterceptors(config) {
      requestArray.push(config.url);
      $timeout(function loader() {
        showLoader(config.url);
      }, 1000);
      return config;
    },
    'response': function responseInterceptors(response) {
      hideToast();
      requestArray = clearArray(requestArray, response.config.url);
      return response;
    },
    'responseError': function rejectionInterceptors(rejection) {
      requestArray = clearArray(requestArray, rejection.config.url);
      return $q.reject(rejection);
    }
  };
};