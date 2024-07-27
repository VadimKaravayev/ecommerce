import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice.js";
import { setCredentials } from '../slices/authSlice.js'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, results] = useRegisterMutation()

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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap()
      console.log(res)
      dispatch(setCredentials(res))
      navigate(redirect)
    } catch (error) {
      console.log(error)
      toast.error('Login error')
    }
  }

  return <FormContainer>
    <h1>Sign Up</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlid="name" className="my-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)} />
      </Form.Group>
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
      <Form.Group controlid="confirm-password" className="my-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} />
      </Form.Group>
      <Button type='submit' variat='primary' className='mt-2' disabled={results.isLoading}>Sign Up</Button>
      {results.isLoading ? <Loader /> : null}
    </Form>
    <Row className='py-3'>
      <Col>Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
    </Row>
  </FormContainer>
}