import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'
import { useAuth } from '../store/cart'
const Login = ({setRoleVar}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const navigate = useNavigate()

  const { login } = useAuth()

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios.post('http://localhost:3001/auth/login', { email, password, role })
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
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='hello@world.com'
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password'
           onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" id="role"
           onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login