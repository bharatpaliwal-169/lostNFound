import React,{useState} from 'react';
import {useNavigate , useLocation} from 'react-router-dom'
import moment from 'moment';

//redux
import { useDispatch } from 'react-redux';
import {deletePost} from '../../../redux/actions/post'


const PostCard = ({post,setCurrentId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-profile'));
  const editable = user?.result?._id===post.creator;
  
  const openPost = () => {
    navigate(`/${post._id}`);
  }

  const handleDelete = () => {
    alert("This Post will be deleted!")
    dispatch(deletePost(post._id));
  }

  // console.log(post);
  return (
    <>
      <div className="col-12 col-md-4 card m-4 p-1"  style={{cursor:'pointer'}}>
        {post.selectedFile ?(<img src={post.selectedFile} className="card-img-top" maxheight={300} width="auto" alt={post._id} onClick={openPost} />) : null}        
        <div className="card-body" onClick={openPost}>
          <div className="card-title">
            <h3 className='text-capitalize'>{post.title}</h3>
          </div>
          <div className="card-text">
            {post.message.length > 50 ? post.message.substring(0,65)+" ....." : post.message}
          </div>
        </div>
          
        { (editable) ? (
          <div className='mt-2'>
            <button className='btn btn-sm btn-primary m-2' onClick={() => setCurrentId(post._id)}>Edit</button>
            <button className='btn btn-sm btn-danger' onClick={handleDelete} >Delete</button>
          </div>
        ) : null }
          
        <small className="card-footer text-muted">
          <b>
            Author : {post.name}
          </b><br /> 
          Posted : {moment(post.createdAt).fromNow()}
        </small>
      </div>
    </>
  )
}

export default PostCard;