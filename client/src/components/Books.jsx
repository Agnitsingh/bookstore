import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from './BookCard'
import '../css/Book.css'
import { useAuth } from '../store/cart'


const Books = ({ role }) => {

  const { isLoggedIn } = useAuth()

  const [books, setBooks] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/book/books')
      .then(res => {
        setBooks(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))
  }, [])

  console.log(isLoggedIn())

  return (
    <div className='books'>
      <h1 className='heading'>Our Collections</h1>
      <div className='book-list'>
        {
          books.map(book => {
            return <BookCard key={book._id} book={book} role={role} />
          })
        }
      </div>
    </div>
  )
}

export default Books