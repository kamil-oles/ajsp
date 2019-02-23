export const APP_INTERCEPTOR_FACTORY = function () {
  return {
    'request': function (config) {
      console.log(config);
      return config;
    }
  };
};