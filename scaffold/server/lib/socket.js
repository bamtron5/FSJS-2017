'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Socket = undefined;

var _main = require('./../main');

var stack = _interopRequireWildcard(_main);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Socket = exports.Socket = function Socket() {
  _classCallCheck(this, Socket);

  this.io = stack.io;
  this.io.on('connection', function (socket) {
    //TODO VALIDATION Orrrr]
    //VALIDATE A 48HR TOKEN HERE FOR EACH
    //LISTEN AT API LEVEL? or NSP?
    //socket.handshake.secure
    //Should not allow 3 users
    //Should validate contestants
    //Should properly disconnect

    socket.on('room', function (room) {
      //look up room
      Rooms.findOne({ name: room }).then(function (data) {
        if (data) {
          console.log('JOINED ' + room);
          socket.emit('createdDate', data.createdAt);
          socket.join(room);
          socket.emit('client connected', true);
        } else {
          socket.emit('client disconnected', true);
        }
      }).catch(function (e) {
        console.log(e);
      });
    });

    socket.on('retrieve messages', function (room) {
      console.log('retrieving messages from ' + room);
      Messages.find({ room: room }).then(function (msgs) {
        socket.emit('messages recieved', msgs);
      }).catch(function () {
        socket.emit('messages recieved', []);
      });
    });

    socket.on('chat message', function (msg) {
      //TODO checking the contestant
      Rooms.findOne({ $or: [{ urlA: msg.contestantSelector }, { urlB: msg.contestantSelector }] }).then(function (data) {
        var cSelector = data.urlA === msg.contestantSelector ? 'A' : 'B';
        if (data) {
          var newMsg = new Messages({
            contestantSelector: cSelector,
            content: msg.message,
            room: msg.room,
            created: msg.created
          });

          newMsg.save(function (err, msg) {
            if (err) console.log(err); // socket back something
            //this one is group so everyone will receive this emit
            io.emit('client return', msg);
          });
        } else {
          socket.emit('client disconnected', true);
        }
      }).catch(function (e) {});
    });

    console.log('Socket IO is on');
  });
};

exports.default = Socket;