// import React from 'react'
// import { Link } from 'react-router-dom';

// const BookCard = ({book, role}) => {
//     const {name, author, imageUrl} = book;
//   return (
//     <div className='book-card'>
//         <img src={imageUrl} alt={name} className='book-image'/>
//         <div className="book-details">
//             <h3>{name}</h3>
//             <p>{author}</p>
//         </div>
//         {role === "admin" &&
//         <div className="book-actions">
//         <button><Link to={`/book/${book._id}`} className='btn-link'>edit</Link></button>
//         <button><Link to={`/delete/${book._id}`} className='btn-link'>delete</Link></button>
//     </div>}
        
//     </div>
//   )
// }

// export default BookCard

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AddToCardButton2 from './AddToCardButton2';
import AddToCardButton from './AddToCardButton';
import { Star } from 'lucide-react';

const BookCard = memo(({ book, role, inCart }) => {
    const { name, author, imageUrl, rating } = book;

    const _book = { ...book, id: book._id ? book._id : book.id }

    return (
        <div className='book-card'>
            {imageUrl ? (
                <img src={imageUrl} alt={name} className='book-image' />
            ) : (
                <img src='https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?w=900&t=st=1715727431~exp=1715728031~hmac=2144b6917dedd0201f1762d502d138998d3ce28175adc53b8fb579d424b1ba9c' alt='Default' className='book-image' />
            )}
            <div className='book-detail'>
                <div className="book-details">
                    <h3>{name}</h3>
                    <p>{author}</p>
                    { rating && <p className='rating'>{Math.round(rating) - 1} <Star /></p>}
                </div>
            </div>
            {inCart ? <AddToCardButton item={_book} /> : <AddToCardButton2 item={_book} />}
            {role === "admin" && (
                <div className="book-actions">
                    <button><Link to={`/book/${book._id}`} className='btn-link'>Edit</Link></button>
                    <button><Link to={`/delete/${book._id}`} className='btn-link'>Delete</Link></button>
                </div>
            )}
        </div>
    );
})

export default BookCard;
