const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
  LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
  TYPING, PRIVATE_MESSAGE, NEW_CHAT_USER,
  JOIN_ROOM} = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {}
let users = 0;

//let communityChat = createChat({ isCommunity:true })
let chatRooms = {};

module.exports = function(io) {
return function(socket){

  // console.log('\x1bc'); //clears console
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
    io.to(roomName).emit("broadcast", {description: `${Object.keys(room.users).length} online`}) 
    io.to(roomName).emit("show", {show: `${socket.user.name} has entered`})   
    socket.on(MESSAGE_SENT, ({message}) => {
      io.to(roomName)
        .emit(MESSAGE_RECIEVED, 
              createMessage({message, sender:user.name}));
    });
    /* Disconnect and logout don't strictly have to have their event
     * listeners set from within JOIN_EVENT's event listener.
     * However, I needed access to the room information somehow.
     *
     * Whatever was did here was probably a poor choice.
     */
    //User disconnects
    socket.on('disconnect', ()=>{
      if("user" in socket){
        let room = chatRooms[roomName];
        room.users = removeUser(room.users, user.name);
    io.emit(USER_DISCONNECTED, room.users);
    io.to(roomName).emit("broadcast", {description: `${Object.keys(room.users).length} online`})
    io.to(roomName).emit("show", {show: `${socket.user.name} has left`})
      }
    });
    //User logsout
    socket.on(LOGOUT, ()=>{
      let room = chatRooms[roomName];
      room.users = removeUser(room.users, socket.user.name);
      io.emit(USER_DISCONNECTED, connectedUsers);
      io.to(roomName).emit("broadcast", {description: `${Object.keys(room.users).length} online`})
      io.to(roomName).emit("show", {show: `${socket.user.name} has left`})   
      
      console.log("Disconnect", connectedUsers);
    })

    callback(room);
  });
}
}
/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user, io){
return (chatId, isTyping)=>{
  io.emit(`${TYPING}-${chatId}`, {user, isTyping})
}
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendMessageToChat(sender, io,data){
return (chatId, message)=>{
  io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
}
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user){
let newList = Object.assign({}, userList)
newList[user.name] = user
return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username){
let newList = Object.assign({}, userList)
delete newList[username]
return newList
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username){
  return username in userList
}