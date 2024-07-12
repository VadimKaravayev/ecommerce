import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../slices/cartSlice';

export default function Header() {

  const cartItemsCount = useSelector(selectCartItemsCount)

  return <header>
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="Proshop logo" />
            ProShop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link><FaShoppingCart />Cart
                {cartItemsCount ? <Badge>{cartItemsCount}</Badge> : null}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link><FaUser />Sign In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
}
