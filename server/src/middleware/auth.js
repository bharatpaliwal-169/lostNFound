import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import logger from '../services/Logger/index.js'
dotenv.config()
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    var token = req.headers.authorization.split(' ')[1];
    let decodedData;
    if (token) {      
      decodedData = jwt.verify(token, SECRET);
      req.userId = decodedData?.id;
    }

    next();
  
  } catch (error) {
    logger.error(`[auth JWT middleware]:${error}`);
  }
};
export default auth;