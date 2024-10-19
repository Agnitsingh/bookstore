// import React from 'react'

// const Recommendations = () => {
//   return (
//     <div>Recommendations</div>
//   )
// }

// export default Recommendations

import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const Recommendations = ({ role }) => {
  const [bookName, setBookName] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend_books', { user_input: bookName });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  console.log(recommendations)

  return (
    <div className='recommendations'>
      <h1 className='heading'>Recommend Books</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Book Name:
        </label>
          <input 
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>
      
      {/* Display recommendations */}
      <div className='book-list'>
        {
          recommendations.map((book, i) => {
            return <BookCard key={book.id} book={book} role={role}></BookCard>
          })
        }
      </div>
    </div>
  );
};

export default Recommendations;
