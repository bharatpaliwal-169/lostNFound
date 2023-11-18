import React,{useEffect} from 'react';
import { BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom';


import Home from "./pages/Home";
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup';
import PostDetails from './pages/PostDetails'
import Team from './pages/Team'
import About from './pages/About'
import Loading from './components/Flash';
const App = () => {
  const [load,setLoad] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {setLoad(false)},2000);
    // const sessionTimer = setTimeout(() => {localStorage.removeItem('user-profile')},60000);
    return () => {
      clearInterval(timer);
      // clearInterval(sessionTimer);
    }  
  }, []);
  
  const user = JSON.parse(localStorage.getItem('user-profile'));
  
  if(load){
    return <Loading></Loading>
  }


  return (
    <>
      {/* <Home /> */}
      <Router>
        <Routes>
          <Route path="/"  element={<Home/>}></Route>
          <Route path="/:id" exact element={<PostDetails />}></Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/about' element={<About />} />
          <Route path='/team' element={<Team />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;