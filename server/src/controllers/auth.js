import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMessage from "../models/auth.js"
import mongoose from 'mongoose';

//services
import logger from '../services/Logger/index.js';

dotenv.config()
const SECRET = process.env.SECRET;

export const login = async (req, res) => {
  logger.info("[controllers/auth/login] login()");
  const {email,password} = req.body;

  try{
    const existingUser = await authMessage.findOne({email});
    logger.info("Login Requested by user : " + existingUser.name);

    if(!existingUser) {
      logger.warn("User does not exist with mailID: " + email);
      return res.status(404).json({message: 'User does not exist'});
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      logger.warn("Wrong Password recieved by user " + existingUser.name);
      return res.status(400).json({message: 'Password is incorrect'});
    }

    const token = jwt.sign({id:existingUser._id}, SECRET, { expiresIn: "1h" });
    //filter
    const loggedInUser = {
      _id : existingUser._id,
      name : existingUser.name,
      email : existingUser.email
    }

    logger.info("Logged in Successful for User : " + loggedInUser.toString());
    res.status(200).json({result : loggedInUser,token:token });
  }
  catch(err) {
    logger.error("[controllers/auth/login] ERROR" + err);
    res.status(500).json({message: "something went wrong"});
  }
}

export const signup = async (req, res) => {

  logger.info("[controllers/auth/signup] : signup()");

  const {firstName,lastName,email,password} = req.body;
  
  try {
    const existingUser = await authMessage.findOne({email});
    if(existingUser){
      logger.warn("Found existing user with this email: " + email);
      return res.status(400).json({message : "user already exists"});
    }
    // enhanced passwords.
    // if(!password && password.length < 6 && password.length > 20){
    //   logger.warn("weak password");
    //   return res.status(406).json({message:"Password lack strength"});
    // }
    const salt =  await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password,salt,12);
    
    const result = await authMessage.create({email, password: hashPassword,name : `${firstName} ${lastName}`});
    
    logger.info("user signed up: " + result.toString());
    
    const token = jwt.sign({email : result.email, id:result._id}, SECRET, { expiresIn: "1h" });
    
    res.status(200).json({result,token});
  } catch (error) {
    logger.error("[controllers/auth/signup] ERROR" + error.toString());
    res.status(500).json({message: "Sign up was not completed! Try again"});
  }

}

export const deleteAccount = async (req, res) => {
  const {id} = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user exist with this id`);
    await authMessage.findByIdAndDelete(id);
    res.status(200).json({message : "Good Bye :( "});
  } catch (error) {
    logger.error("[controllers/auth/delete] ERROR" + error.message);
    res.json({message: "Something went Wrong"});
  }
}
