import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'
import { useAuth } from '../store/cart'
const Register = ({setRoleVar}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { login } = useAuth()

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios.post('http://localhost:3001/auth/register', { email, password })
    .then(res => {
      if(res.data.login && res.data.role === 'admin') {
        setRoleVar('admin')
        navigate('/dashboard')
        login()
      } else if (res.data.login && res.data.role === 'student') {
        setRoleVar("student")
        navigate('/books')
        login()
      }
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='hello@world.com'
           onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"
           onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Register</button>
      </div>
    </div>
  )
}

export default Register