// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const HighRatings = () => {
//   const [highRatingsData, setHighRatingsData] = useState('');

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/recommend')
//       .then(response => {
//         // Set the HTML content received from the backend
//         setHighRatingsData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching high ratings:', error);
//       });
//   }, []);

//   return (
//     <div dangerouslySetInnerHTML={{ __html: highRatingsData }} />
//   );
// }

// export default HighRatings;


import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const HighRatings = ({ role }) => {
  const [highRatingsData, setHighRatingsData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/recommend')
      .then(response => {
        console.log(response.data); // Log the received data
        setHighRatingsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching high ratings data:', error);
      });
  }, []);

  const bookList = useMemo(() => highRatingsData.map((book, i) => {
    return <BookCard key={`${book.id}_${i}`} book={book} role={role} />
  }), [highRatingsData])

  return (
    <div className='high-ratings'>
      <h1 className='heading'>High Ratings</h1>
      {/* Add conditional rendering to handle empty data */}
      <div className='book-list'>
        {bookList}
      </div>
    </div>
  );
};

export default HighRatings;
