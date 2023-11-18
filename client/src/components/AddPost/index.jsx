import React,{useState,useEffect} from 'react'
import FileBase from 'react-file-base64'
import {useNavigate,Link} from 'react-router-dom'

//redux
import {useDispatch,useSelector} from 'react-redux'
import {createPost,updatePost} from '../../redux/actions/post'

const AddPost = ({currentId,setCurrentId}) => {

  const user = JSON.parse(localStorage.getItem('user-profile'));
  const initialPostState = {title: '', message: '', selectedFile : ''}
  const [postData , setPostData] = useState(initialPostState);

  //redux
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.posts.find((p)=> p._id === currentId) : null);
  const navigate = useNavigate();

  const handleChange= (e) => {
    setPostData({...postData,[e.target.name]:e.target.value})
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const validData = checkFormData(postData);
    // if(!validData) {
    //   alert("Hey! try have a smaller title or a more detailed message for a better reach.");
    // }
    if(currentId === 0) {
      //create Post
      dispatch(createPost({...postData,name: user?.result?.name},navigate));
    }
    else{
      //update post
      dispatch(updatePost(currentId,{...postData,name: user?.result?.name}));
    }

    Clear();
  }


  const Clear = () => {
    setCurrentId(null);
    setPostData(initialPostState);

  }

  const checkFormData = (data) => {
    if(data.title.length <=30 && data.message.length >=30){
      return true;
    }
    return false;
  }

  useEffect(() => {
    console.log("AddPost.js: setPostData is called.")
    if(post) setPostData(post);
  }, [post])
  

  if(!user){
    return(
      <>
        <div className="card">
          <div className="card-body">
            <h5>Hey user,</h5>
            <p>
              <b>Login/Signup </b>
              to post about your missing pet.
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="card">
        <div className="card-header brandColor">
          <h3>Post your lost pet</h3>
          <small className='text-muted'>
            our community will help you find your paw-friend soon...
          </small>
        </div>
        <div className="card-body">
          <form method='post' onSubmit={handleSubmit}>
            
            <div className="m-2 mb-4">
              <label htmlFor="title">Title* <span className='text-muted'>(keep it short)</span></label>
              <input type="text" onChange={(e) => setPostData({...postData,title:e.target.value})} name='title'
                value={postData.title}
                className="form-control" id="title"
                placeholder="Lost my paw-frient : dogo"
              />
            </div>

            <div className="m-2 mb-4">
              <label htmlFor="message">Message* <span className='text-muted'>(describe about your pet)</span></label>
              <textarea type="text" onChange={(e) => setPostData({...postData,message:e.target.value})} name='message'
                value={postData.message}
                className="form-control" id="message" minrows={10}
                placeholder="few details and contact info..." 
              />
            </div>

            <div className="m-2 mb-4">
              {/* <input type="file" name="file" id="fileUpload1" accept="image/*" style={{marginBottom:'0.25rem'}} /> */}
              <label htmlFor="fileUpload1">
                Upload an Image
              </label>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />

            </div>

            <div className="m-2 d-grid">
              <button type='submit' className='btn btn-md btn-primary'>
                {currentId ? "Update this post" : "Add post to Feed"}
              </button>

            </div>

          </form>
          <div className='m-2 d-grid'>
            <button type='clear' className='btn btn-md btn-outline-danger mt-3' onClick={Clear}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPost;