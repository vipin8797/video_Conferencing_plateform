import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto"; 



 const login = async (req, res) => {
  const { username, password } = req.body;

  // ✅ Step 1: Validate input
  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Username or password missing in request." });
  }

  try {
    // ✅ Step 2: Check user existence
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found in database." });
    }

    // ✅ Step 3: Compare password properly (await is required)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid password." });
    }

    // ✅ Step 4: Generate token (temporary example)
    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();

    // ✅ Step 5: Send response
    res.status(httpStatus.OK).json({
      message: "Login successful",
      token,
    });
  } catch (e) {
    console.error(e);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Some error happened: ${e}` });
  }
};




const register = async(req,res)=>{
    const {name,username,password} = req.body;

    try{
     const existingUser = await User.findOne({username});
     if(existingUser){
        return res.status(httpStatus.FOUND).json({message:"User already existed"});
     }
     const hashedPassword = await bcrypt.hash(password,10);

     const newUser = new User({
        name:name,
        username:username,
        password:hashedPassword,
     });
     await newUser.save();
     res.status(httpStatus.CREATED).json({message:"User created succesfull."});
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:`Some Error Happen ${e.message}`});
    }
}

export {login,register};