import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { setCredentials } from '../slices/authSlice.js'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, results] = useLoginMutation()

  const { userInfo } = useSelector(state => state.auth)
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const handleSubmit = async e => {
    console.log(results)
    e.preventDefault()

    try {
      const res = await login({ email, password }).unwrap()
      console.log(res)
      dispatch(setCredentials(res))
      navigate(redirect)
    } catch (error) {
      console.log(error)
      toast.error('Login error')
    }
  }

  return <FormContainer>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlid="email" className="my-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlid="password" className="my-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button type='submit' variat='primary' className='mt-2' disabled={results.isLoading}>Sign In</Button>
      {results.isLoading ? <Loader /> : null}
    </Form>
    <Row className='py-3'>
      <Col>New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
    </Row>
  </FormContainer>
}