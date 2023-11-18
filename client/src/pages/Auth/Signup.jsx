import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

//redux
import {useDispatch} from 'react-redux'
import {signup} from '../../redux/actions/auth';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import bigL from '../../assets/images/bigLogo.png'

const Signup = () => {
  //state
  const initialState = {
    firstName: '',lastName: '',email: '',password: ''
  };
  const [formData,setformData] = useState(initialState);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  //functions
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    dispatch(signup(formData,navigate));
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
            <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>

            <div className="form-floating">
              <input type="text" className="form-control" onChange={handleChange} name='firstName'
              id="floatingFname" placeholder="firstname"/>
              <label htmlFor="floatingFname">First Name</label>
            </div>
            <div className="form-floating">
              <input type="text" className="form-control" onChange={handleChange} name='lastName'
              id="floatingLname" placeholder="lastname"/>
              <label htmlFor="floatingLname">Last Name</label>
            </div>
            
            <div className="form-floating">
              <input type="email" className="form-control" onChange={handleChange} name='email'
              id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" onChange={handleChange} name='password'
              id="floatingPassword" placeholder="Password"/>
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
              <Button variant='primary' className="btn btn-primary w-100 py-2" type="submit">Create Account</Button>
            }

            <p className='text-muted mt-2'>Already have an account?
              <a href="/auth/login">login here</a>
            </p>
          </form>
        </main>

    </>
  )
}

export default Signup;