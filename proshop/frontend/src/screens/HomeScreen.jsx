import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function HomeScreen() {

  const { data: products = [], isLoading, error } = useGetProductsQuery();

  if (error) return
  <Message variant='danger'>
    <h4>Products error</h4>
  </Message>

  if (isLoading) return <Loader />

  const renderedCols = products.map(product => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ))

  return <>
    <h1>Latest Products</h1>
    <Row>
      {renderedCols}
    </Row>
  </>;
}
