const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
  LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
  TYPING, PRIVATE_MESSAGE, NEW_CHAT_USER,
  JOIN_ROOM, BROADCAST, SHOW} = require('./Events')

const { createUser, createMessage, createChat } = require('./Factories')

let connectedUsers = {}
let users = 0;

let chatRooms = {};

module.exports = function(io) {
return function(socket){

  console.log("Socket Id:" + socket.id);

  /* Checks if a user with that nickname exists in the specified
   * room.
   */
  socket.on(VERIFY_USER, (nickname, roomName, callback)=>{
    console.log(`Verifying user for nickname: ${nickname} in room ${roomName}`);
    let room = chatRooms[roomName];
    console.log("Room:", room);

    if (!room || !isUser(room.users, nickname)) {
      console.log("Room did not exist.");
      callback({
        isUser:false,
        user:createUser({name:nickname, socketId:socket.id})})
    }else{
      console.log("Room existed.");
      callback({ isUser:true, user:null })
    }
  })

  //User Connects with username
  socket.on(USER_CONNECTED, (user)=>{
    user.socketId = socket.id
    socket.user = user
    // io.sockets.emit("broadcast", {description: `${users += 1} online`})	  
    // io.sockets.emit("show", {show: `${user.name} has joined`})
  })

  socket.on(JOIN_ROOM, (user, roomName, callback) => {
    console.log("User is joining room:", user, roomName);
    let room = chatRooms[roomName];
    if (!room) {
      room = createChat({name:roomName, isCommunity:true});
      chatRooms[roomName] = room;
    }
    room.users = addUser(room.users, user);
    socket.join(roomName);
    io.to(roomName).emit(BROADCAST, {description: `online (${Object.keys(room.users).length})`}) 
    io.to(roomName).emit(SHOW, {show: `${socket.user.name} has entered`})   
    socket.on(MESSAGE_SENT, ({message}) => {
      io.to(roomName)
        .emit(MESSAGE_RECIEVED, 
              createMessage({message, sender:user.name}));
    });
 
    //User disconnects
    socket.on('disconnect', ()=>{
      if("user" in socket){
        let room = chatRooms[roomName];
        room.users = removeUser(room.users, user.name);
    io.emit(USER_DISCONNECTED, room.users);
    io.to(roomName).emit(BROADCAST, {description: `online (${Object.keys(room.users).length})`}) 
    io.to(roomName).emit(SHOW, {show: `${socket.user.name} has left`})
      }
    });
    //User logsout
    socket.on(LOGOUT, ()=>{
      let room = chatRooms[roomName];
      room.users = removeUser(room.users, socket.user.name);
      io.emit(USER_DISCONNECTED, connectedUsers);
      // io.to(roomName).emit(BROADCAST, {description: `${Object.keys(room.users).length} online`})
      // io.to(roomName).emit(SHOW, {show: `${socket.user.name} has left`})   
      
      console.log("Disconnect", connectedUsers);
    })

    callback(room);
  });
}
}

function sendTypingToChat(user, io){
return (chatId, isTyping)=>{
  io.emit(`${TYPING}-${chatId}`, {user, isTyping})
}
}


function sendMessageToChat(sender, io,data){
return (chatId, message)=>{
  io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
}
}


function addUser(userList, user){
let newList = Object.assign({}, userList)
newList[user.name] = user
return newList
}

function removeUser(userList, username){
let newList = Object.assign({}, userList)
delete newList[username]
return newList
}


function isUser(userList, username){
  return username in userList
}