angular.module('library-app').factory('socket', () => {
  let socket = io('/');
  return socket;
});
