import {Container,Nav,Navbar,Offcanvas} from 'react-bootstrap';

const MyNavbar = () => {
  const expand = "lg"
  return (
    <>
      <Navbar expand={expand} className="bg-secondary mb-3">
        <Container fluid>
          <Navbar.Brand href="/">LNF</Navbar.Brand>
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
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">about</Nav.Link>
                <Nav.Link href="/">team</Nav.Link>
                
              </Nav>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
    </>
  );
}

export default MyNavbar;