// adds .6 megabytes uncompressed
import lodash from 'lodash';
export default
  angular.module('App.factory._', [])
    .factory('_', () => {
      return lodash;
    }).name;
