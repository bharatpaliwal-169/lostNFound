import mongoose from 'mongoose';

// we create a schema as fun wih some objects, with schemas 
// we make document about the way we want data. 

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name:String,
  creator: String,
  selectedFile: String,
  viewCount : {
    type: Number,
    default: 0
  },
  createdAt: {
      type: Date,
      default: new Date(),
  },

});

// now we will convert this schema into a model with which we will be able to CRUD.
var PostMessage = mongoose.model('PostsTable',postSchema);
export default PostMessage;