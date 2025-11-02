import {Server} from "socket.io";
import cors from "cors";
import {server} from "../app.js";

let connections = {};
let messages = {};
let timeOneline = {};



const io = new Server(server);
// export const connectToSocket = (server) => {
  
// }
  


//listener
io.on('connection',(socket)=>{

socket.on('joi-call',(path)=>{
   if(connections[path] === undefined){
    connections[path] = [];
   }
   connections[path].push(socket.id);

   timeOneline[socket.id] = Date.now();

   for(let i = 0; i<connections[path].length; i++){
      io.to(connections[path][i]).emit('user-joined',socket.id,connections[path])
   }

   if(messages[path] !== undefined){
      for(let i=0; i<messages[path].length; i++){
        io.to(socket.id).emit('chat-message',messages[path][i]['data'],
          messages[path[i]['sender']], messages[path][i]['socket-id-sender']
        );
      }
   }
});


socket.on('signal',(toId,message)=>{
   io.to(toId).emit("signal",socket.id,message);
})

socket.on('chat-message',(data,sender)=>{
   
  const [matchingRoom , found] = Object.entries(connections)
    .reduce(([room,isFound],[roomKey,roomValue])=>{
      if(!isFound && roomValue.includes(socket.id)){
        return [roomKey,true];
      }
      return[room ,isFound];
    },['',false]);
     if(found === true){
       if(messages[matchingRoom] === undefined){
        messages[matchingRoom] = [];
       }

       messages[matchingRoom].push({'sender':sender, "data":data, "socket-id-sender":socket.id});
       console.log("messages",key ,":",sender,data);

       connections[matchingRoom].forEach(elem => {
        io.to(elem).emit('chat-message',data,sender,socket.id);
       });
     }
})

socket.on('disconnect',()=>{
  let diffTime = Math.abs(timeOneline[socket.id] - new Data())
  let key

  for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
    for(let i=0; i<v.length; i++){
      if(v[i] == socket.id){
        key = k;
         
        for(let j=0; j<connections[key].length; j++){
           io.to(connections[key][j]).emit('user-left',socket.id)
        }
        let index = connections[key].indexOf(socket.id);
        connections[key].splice(index,1);
      }
    }
  }
});
})