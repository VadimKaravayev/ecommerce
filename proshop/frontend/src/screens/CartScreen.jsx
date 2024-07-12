import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectCartItemsCount, selectCartItemsPrice, updateCartItemQty, removeFromCart } from '../slices/cartSlice'
import { range } from '../utils'

export default function CartScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)
  const cartItemsCount = useSelector(selectCartItemsCount)
  const cartItemsPrice = useSelector(selectCartItemsPrice)
  const isEmptyCart = cartItemsCount === 0

  const handleChangeItemQty = (id, newQty) => {
    dispatch(updateCartItemQty({ id, newQty }))
  }

  const handleRemoveFromCart = id => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    navigate('/login?redirect=/shipping')
  }

  return <Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {isEmptyCart
        ? <Message>Your cart is empty. <Link to='/'>Go back</Link></Message>
        : <ListGroup variant='flush'>
          {Object.values(cartItems).map(({ _id, image, name, price, qty, countInStock }) => (
            <ListGroup.Item key={_id}>
              <Row>
                <Col md={2}>
                  <Image src={image} alt={name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${_id}`}>{name}</Link>
                </Col>
                <Col md={2}>
                  {price}
                </Col>
                <Col md={2}>
                  <Form.Control as='select' value={qty} onChange={e => handleChangeItemQty(_id, Number(e.target.value))}>
                    {range(1, countInStock).map(val => <option key={val} value={val}>{val}</option>)}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={e => handleRemoveFromCart(_id)}><FaTrash /></Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>}
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Subtotal ({cartItemsCount}) items</h2>
            {cartItemsPrice.toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button onClick={handleCheckout} type='button' className='btn-block' disabled={isEmptyCart}>Proceed to Checkout</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
}