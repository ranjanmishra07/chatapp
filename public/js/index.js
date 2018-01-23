var socket=io();
 socket.on('connect',function (){
   console.log("connected to server");

   socket.emit('createMessage',{
     to:'ranjan',
     text:'hey this is from client'
   })
 });
 socket.on('disconnect',function (){
   console.log("disconnected from server");
 })
socket.on('newMessage',function(message){
  console.log('creating a new  message',message);
})
