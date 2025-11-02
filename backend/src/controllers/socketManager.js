import {Server} from "socket.io";
import cors from "cors";
import {server} from "../app.js";

let connections = {};
let messages = {};
let timeOneline = {};

// 🔹 Explanation:
// connections: har room me kaun kaun connected hai, uska list rakhta hai.
// Example: { "room1": ["socketID1", "socketID2"] }

// messages: har room ke messages ko store karta hai.
// Example: { "room1": [ { sender: "Vipin", data: "Hello" } ] }

// timeOneline: har user ne kab connect kiya, wo time store karta hai.




const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders:['*'],
    credentials:true,
  }
});
// export const connectToSocket = (server) => {
  // }
  



//listener
io.on('connection',(socket)=>{

socket.on('joi-call',(path)=>{
 //agar  "pat" name ka koi room hai to usme currrent socket id ko push kar do
 //nhi to room banake use current socket id push kar do.
   if(connections[path] === undefined){
    connections[path] = [];
   }
   connections[path].push(socket.id);

 //currrent socket id and uska time store kar do.  
   timeOneline[socket.id] = Date.now();

   //Room me connetted sabhi users ko notif kar do 
   //ki koi new socket id connect hui hai and currently saare connecte users ka data bhi bhej do.
   for(let i = 0; i<connections[path].length; i++){
      io.to(connections[path][i]).emit('user-joined',socket.id,connections[path])
   }

   //agar iss room me pehlse se messages hai jo new user ne miss kar diye
   //to unhe new user ko bhi bhej do.
   if(messages[path] !== undefined){
      for(let i=0; i<messages[path].length; i++){
        io.to(socket.id).emit('chat-message',messages[path][i]['data'],
          messages[path[i]['sender']], messages[path][i]['socket-id-sender']
        );
      }
   }
});

//signal event jab koi user dusre user ko signal bhejna chahta hai
//to connect via WebRTC
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

// ⚙️ Summary (Simple Table)
// Step	Event	Description
// 1	'chat-message'	User message bhejta hai
// 2	Find room	Server check karta hai ki user kis room me hai
// 3	Save message	Room ke messages array me store hota hai
// 4	Broadcast	Room ke sab users ko message bhejta hai
// 5	'disconnect'	Jab user nikalta hai
// 6	Notify others	Sabko “user-left” event bhejta hai
// 7	Cleanup	Empty room delete karta hai

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

        if(connections[key].length == 0){
          delete connections[key];
        }
      }
    }
  }
});
})