import mongoose from 'mongoose'

import PostMessage from '../models/post.js';
import client from '../services/Cache/index.js'

import logger from '../services/Logger/index.js'


var flag = false;
// application logic is written here

export const getPosts = async (req,res) => {

  const cacheKey = (process.env.CACHE_KEY).toString();
  try {

    // Caching
    try {
      if(flag == false){
        const cachedData = client.get(cacheKey);
        if(cachedData === null || cachedData === undefined || cachedData === ""){
          logger.info("[controllers/getPosts] nothing in cache!!");
        }else{
          logger.info("[controllers/getPosts] Sending data from cache!");
          return res.status(200).json({data : JSON.parse(cachedData)});
        }
      }
      
      logger.info("[controllers/getPosts] Fetching data from DB");
      //FetchFromDB
      const posts = await PostMessage.find();
      client.set(cacheKey, JSON.stringify(posts));      
      
      flag = false;
      // logger.info(posts);
      res.status(200).json({data : posts});
    
    } catch (error) {
      logger.error("[controllers/getPosts] ERROR : " + error.toString());
    }
  } catch (error) {
    logger.error("[controllers/getPosts] ERROR");
    res.status(404).json({message: "Something went wrong"});
  }
};


export const getPostsBySearch = async (req, res) => {
  logger.info("[getPostsBySearch] Started");
  const {searchQuery} = req.query;
  
  try {
    const title = new RegExp(searchQuery, 'i'); // all will be same -> TEST,Test,TEst,test anything
    const posts = await PostMessage.find({ title });
    res.status(200).json({data:posts});
    
  } catch (error) {
    res.status(404).json({message: error.message});
  }
  logger.info("[getPostsBySearch] Ended Successfully.");
}

//details page for each post
export const getPost = async (req, res) => { 
  const { id } = req.params;
  try {
      const post = await PostMessage.findById(id);
      post.viewCount++;
      await PostMessage.findByIdAndUpdate(id,post,{new : true});
      res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async(req, res) => {
  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    if(post.title.length > 30 || post.message.length > 5000){
      logger.warn("invalid data in post")
      res.status(400).json({message : "Post data is invalid"})
    }
    const result = await newPost.save();
    logger.info("New post created");

    res.status(200).json(newPost);
  } catch (error) {
    logger.error(`[createPost] ${error}`)
    res.status(404).json({message: "Something went wrong"});
  }
  flag = true;
}

export const updatePost = async(req, res) => {
  const cacheKey = (process.env.CACHE_KEY).toString();
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
    client.del(cacheKey)
  
    res.status(200).json({message:`Post updated successfully`});
  } catch (error) {
    logger.error("[updatePost] "+ error.toString());
    res.status(500).json({message : " Something went wrong "});

  }
  flag = true;
}

export const deletePost = async (req, res) =>{
  const cacheKey = (process.env.CACHE_KEY).toString();
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    
    client.del(cacheKey);
    res.json({message : 'post is deleted successfully'})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"});
  }
  flag = true;
}
