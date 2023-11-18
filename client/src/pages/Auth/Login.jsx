import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

//redux
import {useDispatch} from 'react-redux'
import {login} from '../../redux/actions/auth';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import bigL from '../../assets/images/bigLogo.png'


const Login = () => {

  const initialState = {email: '',password:''};
  const [formData,setformData] = useState(initialState);
  const [loading,setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
    // if(formData.password.length < 6 && isSignup){
    //   alert('password must be at least 6 characters');
    //   return;
    // }
    console.log(formData);
    setLoading(true);
    dispatch(login(formData,navigate));
    setLoading(false);
  }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }
  

  return (
    <>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={bigL} alt="logo" width="100" height="100" />
          <h1 className="h3 mb-3 fw-normal">Hey there, Login</h1>

          <div className="form-floating">
            <input type="email" onChange={handleChange} name='email'
              className="form-control" id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input type="password" onChange={handleChange} name='password'
              className="form-control" id="floatingPassword" 
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {loading ?
            <Button variant='primary'>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
            </Button>
          :
            <Button variant='primary' className="btn btn-primary w-100 py-2" type="submit">Login</Button>
          }

          <p className='text-muted mt-2'>Want to have a new account?
            <a href="/auth/signup">sign up here</a>
          </p>
        </form>
      </main>
    </>
  )
}

export default Login;