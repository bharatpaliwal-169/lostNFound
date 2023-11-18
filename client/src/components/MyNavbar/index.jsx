import React,{useState} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';

//redux
import {useDispatch} from 'react-redux';
import { getPostsBySearch} from '../../redux/actions/post';

import {Container,Nav,Navbar,Offcanvas} from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const MyNavbar = () => {
  const expand = "lg";
  const user = JSON.parse(localStorage.getItem('user-profile'));
  const dispatch = useDispatch();
  const query = useQuery(); 
  const navigate = useNavigate();
  const searchQuery = query.get('searchQuery');

  const [search,setSearch] = useState("");
  
  const handleLogout = () => {
    localStorage.removeItem('user-profile');
    window.location.reload();
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(search);
    if(!search){
      navigate("/");
    }else{
      // console.log(search);
      dispatch(getPostsBySearch(search));
      // navigate(`/?searchQuery=${search}`);
    }
  }

  return (
    <>
      <Navbar expand={expand} style={{marginBottom:'0.75rem',borderBottom:'1px solid gray',padding:'0.5rem'}} >
        <Container fluid>
          <Navbar.Brand href="/" className='brandColor' >
            <img src={logo} alt="logo" width={32} height={32} />
            <span style={{fontSize:'1.25rem',marginLeft:'0.15rem'}}>
              PETS REUNITE HUB
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                LNF
              </Offcanvas.Title>
            </Offcanvas.Header>
            
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link active href="/">Home</Nav.Link>
                <Nav.Link href="/about">about</Nav.Link>
                <Nav.Link href="/team">team</Nav.Link>

                <form className='ms-md-5 p-md-2' onSubmit={handleSubmit}>
                  <input type="text" name='searchQuery' onChange={handleChange}
                    placeholder='search for pet...' className='ps-md-2 pr-md-2'
                  />
                  <button type="submit" className='btn btn-sm btn-outline-info ms-3 ' 
                  >
                    search
                  </button>
                </form>
              </Nav>
              
              <Nav className="justify-content-end flex-grow-1">
                {user? 
                  <>
                    <Nav.Link onClick={handleLogout}>logout</Nav.Link>
                  </> 
                  : 
                  <>
                    <Nav.Link href="/login">
                      <span className='btn btn-outline-primary btn-sm'>
                        login
                      </span>
                    </Nav.Link>
                    <Nav.Link href="/signup">
                      <span className='btn btn-primary btn-sm'>
                        Signup
                      </span>
                    </Nav.Link>
                    
                  </>
                }
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
    </>
  );
}

export default MyNavbar;