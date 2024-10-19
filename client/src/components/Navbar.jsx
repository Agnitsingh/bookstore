import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'
import CartButton from './CartButton'
import { useAuth } from '../store/cart'

const Navbar = ({role}) => {

  const {isLoggedIn} = useAuth()
  return (
    <nav className='navbar'>
        <div className='navbar-left'>
            <Link to="/" className='navbar-brand'>Smart Shelf</Link>
        </div>
        <div className='navbar-right'>
            <Link to="/books" className='navbar-link'>Books</Link>
            <Link to="/highratings" className='navbar-link'>High Ratings</Link>
            <Link to="/recommendations" className='navbar-link'>Recommendations</Link>
            {isLoggedIn() && role === "student" && <Link to="/cart" className='navbar-link'><CartButton /></Link>}
            {role === "admin" && <>
              <Link to="/addbook" className="navbar-link">Add Book</Link>
              <Link to="/addstudent" className="navbar-link">Add User</Link>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </>
            }
            {role === ""
              ? <div className='navbar-auth'>
                  <Link to="/login" className='navbar-link'>Login</Link>
                  <Link to="/register" className='navbar-link-alt'>Register</Link>
                </div>
              : <Link to="/logout" className='navbar-link'>Logout</Link>
             }
            
        </div>
    </nav>
  )
}

export default Navbar

