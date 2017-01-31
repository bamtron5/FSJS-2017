import * as stack from './../main';

export class Socket {
  public io;
  constructor() {
    this.io = stack.io;
    this.io.on('connection', (socket) => {
     //TODO VALIDATION Orrrr]
     //VALIDATE A 48HR TOKEN HERE FOR EACH
     //LISTEN AT API LEVEL? or NSP?
     //socket.handshake.secure
     //Should not allow 3 users
     //Should validate contestants
     //Should properly disconnect

     socket.on('room', function(room) {
       //look up room
       Rooms.findOne({name: room}).then((data) => {
         if(data) {
           console.log(`JOINED ${room}`);
           socket.emit('createdDate', data.createdAt);
           socket.join(room);
           socket.emit('client connected', true);
         } else {
           socket.emit('client disconnected', true);
         }
       }).catch((e) => {
         console.log(e);
       });
     });

     socket.on('retrieve messages', (room) => {
       console.log(`retrieving messages from ${room}`);
       Messages.find({room: room}).then((msgs) => {
         socket.emit('messages recieved', msgs);
       }).catch(() => {
         socket.emit('messages recieved', []);
       });
     });

     socket.on('chat message', function(msg){
       //TODO checking the contestant
       Rooms.findOne({$or: [{urlA: msg.contestantSelector}, {urlB: msg.contestantSelector}]})
         .then((data) => {
           let cSelector = data.urlA === msg.contestantSelector
            ? 'A' : 'B';
           if(data) {
             var newMsg = new Messages({
               contestantSelector: cSelector,
               content: msg.message,
               room: msg.room,
               created: msg.created
             });

             newMsg.save(function(err, msg){
               if(err) console.log(err); // socket back something
               //this one is group so everyone will receive this emit
               io.emit('client return', msg);
             });
           } else {
             socket.emit('client disconnected', true);
           }
         }).catch((e) => {

         });
     });

     console.log('Socket IO is on');
    });
  }
}

export default Socket;
