import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "node:http";
//import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"; //user Routes



dotenv.config(); // ✅ Always after imports

const app = express();
export const server = createServer(app);


app.use(cors({
      origin: "*", // yaha apna frontend URL dal sakte ho
      methods: ["GET", "POST"],
    }));
app.use(express.json({limit:"40kb"})); //req me json type ka data accepted now
app.use(express.urlencoded({limit:"40kb",extended:true}));





// Sample route
app.get("/home", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/user",userRoutes);//userRoutes












// Start server
const start = async() => {
//Connect MongoDB (example)
 await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
 
    server.listen(process.env.PORT, ()=>{ // ye app and io  dono ko same server and port pe run karega.
    console.log(`listening at port ${process.env.PORT}`)
});

  })
  .catch((err) => console.error("DB connection error:", err));
};



  

start();