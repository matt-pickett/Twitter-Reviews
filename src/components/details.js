import React from 'react';
import GetDate from './getDate';
const Details = ({ review }) => {

    // Display star emojis based on the rating
    const Stars = ({ stars }) => {
        const starEmojis = [];
        
        for (let i = 0; i < stars; i++) {
            starEmojis.push(<span key={i}>&#x2B50;</span>);
        }
        
        return (
            <span className='pt-3'>
                {starEmojis}
            </span>
        );
    };

    return (
    <div className={`${window.innerWidth < 650 ? 'pt-5' : ''}`}>
      <h4 className="fw-bold">{review.title}</h4>
      <Stars stars={review.stars}></Stars>
      <p className="fs-5 pt-3">{review.review}</p>
      <p className="fw-bold">by {review.author}</p>
      <GetDate date={review.date}></GetDate>
    </div>
  );
};

export default Details;
