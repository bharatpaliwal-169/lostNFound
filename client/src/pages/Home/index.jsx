import React,{useState,useEffect} from 'react';

//redux
import {useDispatch} from 'react-redux';
import { getPosts } from '../../redux/actions/post';


import Navbar from '../../components/MyNavbar'
import AddPost from '../../components/AddPost';
import Feed from '../../components/Feed';
import Footer from '../../components/Footer'

const Home = () => {
  const dispatch = useDispatch();
  
  const [currentId,setCurrentId] = useState(0);
  
  useEffect(() => {
    console.log("Home.js : getAllPosts is called.")
    dispatch(getPosts());
  }, [currentId,dispatch]);

  return (
    <>
      <div className="container-fluid">
        <Navbar currentId={currentId} setCurrentId={setCurrentId} />
        <div className="row">
          <div className="col-12 col-md-4 order-1">
            <AddPost currentId={currentId} setCurrentId={setCurrentId} />
          </div>

          <div className="col-12 col-md-7 offset-md-1">
            <Feed setCurrentId={setCurrentId} />
          </div>

        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home;