import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { range } from "../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";


export default function ProductScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const [qty, setQty] = useState(1);

  if (error) return <Message variant='danger'><h5>Oops..</h5></Message>
  if (isLoading) return <Loader />

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  return <>
    <Link className="btn btn-light my-3" to="/" >Go back</Link>
    <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Price: ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col><strong>{product.price}</strong></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col><strong>{product.countInStock ? "In Stock" : "Out of Stock"}</strong></Col>
              </Row>
            </ListGroup.Item>

            {product.countInStock ? <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Form.Control as='select' value={qty} onChange={e => setQty(parseInt(e.target.value))}>
                    {range(1, product.countInStock).map(val => <option key={val} value={val}>{val}</option>)}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item> : null}

            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                onClick={addToCartHandler}
                disabled={!product.countInStock}>Add to Cart</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </>;
}