//imports 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

//services
import logger from './src/services/Logger/index.js'

//import routes here
import postRoutes from './src/routes/posts.js';
import authRoutes from './src/routes/auth.js';


//basic setup
dotenv.config()
const app = express();
app.use(express.json({limit: "50mb",extended : true}));
app.use(express.urlencoded({limit: "50mb",extended : true}));
app.use(cors());
app.use(helmet());


//DB connection
const PORT = process.env.MY_PORT|| process.env.PORT;
const DB_SERVER_URL = process.env.DB_URL;


mongoose.connect(DB_SERVER_URL)
  .then(() => app.listen(PORT, () => logger.info(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => logger.error(`${error} did not connect`));
  
//authentication
app.use('/auth',authRoutes);

//posts 
app.use('/posts',postRoutes);

app.get('/',(req, res) => {
  res.send("APP is UP n RUNNING");
});
app.get('/*',(req,res)=> {
  res.send("Undefined endpoint!")
});

export default app;