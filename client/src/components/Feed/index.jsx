import React from 'react';
//redux
import {useSelector} from 'react-redux';
import Loading from '../Loading';
import PostCard from './post';


const Feed = ({setCurrentId}) => {
  const {posts,isLoading} = useSelector((state) => state?.posts);

  const latestPosts = [...posts].reverse();
  if(!posts.length && !isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }
  // console.log(posts);
  // console.log(isLoading);
  return (
    isLoading ? <Loading /> : (
      <>
        <div className="row">
          {latestPosts.map((post,index)=> {
            // console.log(post);
            return(
              <>
                <PostCard post={post} setCurrentId={setCurrentId} key={index} />
              </>
            )
          })}
        </div>
      </>
    )
  )
}

export default Feed;