import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>

      <Navbar bg="light">
        <Container>
          <Link to="/" className="navbar-brand fs-1 ">The Night Manager</Link>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/myorder">MyOrder</Nav.Link>
            <Nav.Link as={Link} to="/user">User</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
            

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;



