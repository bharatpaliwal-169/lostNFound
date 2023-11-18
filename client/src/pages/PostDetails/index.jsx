//react
import React,{useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom';

//redux
import {useDispatch,useSelector} from 'react-redux';
import {getPost,getPostsBySearch} from '../../redux/actions/post'
import moment from 'moment';

import Loading from '../../components/Loading';

const PostDetails = () => {
  const { post,isLoading } = useSelector((state)=> state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // to use value from url params eg : http/ ... / {..} <- these are params
  const {id} = useParams();

  //to get individual post
  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  //search functionality
  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none'}));
    }
  }, [post]);


if (!post) return null;
  return (
    <>
      {isLoading ? <Loading/> : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3 mt-5 card text-center">
                <div className="card-body">
                  <h1 className='card-title text-capitalize'>{post.title}</h1>
                  {post.selectedFile ? <img src={post.selectedFile} alt={post._id} className='img-fluid' height={300} width={300} /> : null} 
                  <p className='card-text mt-3 mb-3'>{post.message}</p>
                  <div className='card-text'>
                    <b>
                    Views : {post.viewCount} <br />
                    Created : {moment(post.createdAt).fromNow()} <br />
                    </b>
                  </div>
                  
                  <h5>Author : {post.name}</h5>
                </div>
                <div className="card-footer">
                  <a href="/" rel="noopener noreferrer" className='card-link'>Back to Home</a>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </>
  )
}

export default PostDetails;