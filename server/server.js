const path=require('path');
const http=require('http');
const express=require('express');
const publicPath=path.join(__dirname,'../public');
const socketIO=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');
var app=express();
const port=process.env.PORT||3000;
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('user connected');


  socket.emit('newMessage',generateMessage('Admin','welcome to the chat app'))
  socket.broadcast.emit('newMessage',generateMessage('Admin','new user conected'));

  socket.on('createMessage',(message)=>{
    console.log('creating a message from client',message);
    io.emit('newMessage',generateMessage(message.from,message.text))
    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // })
  })

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  })

  socket.on('disconnect',()=>{
    console.log('client disconnected');
  });



})

server.listen(port,()=>{
  console.log(`sever is running on ${port}`);
})
