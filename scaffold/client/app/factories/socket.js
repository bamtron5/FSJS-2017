import io from 'socket.io';
export default
  angular.module('App.factory.socket')
    .factory('socket', () => {
      let socket = io('/');
      return socket;
    }).name;
