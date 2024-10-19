import React, { useState } from 'react'
import axios from 'axios'
import  {useNavigate} from 'react-router-dom'

const AddStudent = () => {
    const [roll, setRoll] = useState('')
    const [email, setEmail] = useState('')
    const [grade, setGrade] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/student/register', {roll, email, password, grade})
        .then(res => { 
            if(res.data.registered) {
                navigate('/dashboard')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
      }

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <div className="form-group">
          <label htmlFor="roll">User Id:</label>
          <input type="text" id="roll" name="roll" 
          onChange={(e) => setRoll(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" 
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="grade">Name</label>
          <input type="text" id="grade" name="grade" 
          onChange={(e) => setGrade(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" 
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default AddStudent