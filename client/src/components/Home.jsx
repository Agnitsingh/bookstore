import React, { useEffect } from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='hero'>
      <div className="hero-content">
        <h1 className='hero-text'>SMART-SHELF</h1>
        <p className='hero-description'>
          A premium integrated bookstore with personalised curation and recommendation.
        </p>
        <div>
          <Link to="/register" className='navbar-link-alt'>Register Now!</Link>
        </div>
      </div>
      <div className="hero-image"><img src="./Images/homepage.png" alt="" width="500" height="300" /></div>
    </div>
  )
}

export default Home