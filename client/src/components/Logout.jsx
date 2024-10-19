import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/cart'

const Logout = ({setRole}) => {
    const navigate = useNavigate()
    const {logout} = useAuth()
  useEffect(() => {
    axios.get('http://localhost:3001/auth/logout')
    .then(res => {
        if(res.data.logout) {
            setRole('')
            logout()
            navigate('/')
        }
    }).catch(err => console.log(err))
  }, [])
}

export default Logout