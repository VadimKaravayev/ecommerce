import { useState } from "react"
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }

  return <FormContainer>
    <CheckoutSteps step1 step2 step3 />
    <h1>Payment Method</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          Select Method
        </Form.Label>
        <Col>
          <Form.Check
            type='radio'
            className="my-2"
            label='PayPal or Credit Card'
            name='paymentMethod'
            value={paymentMethod}
            checked
            onChange={e => setPaymentMethod(e.target.value)}
            id='paypal'>

          </Form.Check>
        </Col>
      </Form.Group>
      <Button type='submit' variant='primary'>Continue</Button>
    </Form>
  </FormContainer>;
}