import React, { useState, useEffect } from 'react';
import Details from './details';

const RenderReviews = ({ groupedReviews }) => {
    const [expandedReviewId, setExpandedReviewId] = useState(null);
    const [maxWidth, setMaxWidth] = useState('400px');

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 442) {
          setMaxWidth('100px');
        }
        else if (window.innerWidth < 600) {
          setMaxWidth('200px');
        } else if (window.innerWidth < 900) {
          setMaxWidth('300px');
        } else {
          setMaxWidth('400px');
        }
      }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    // Set one review to 'expand'. If already expanded, make it not expanded
    const handleExpand = (reviewId) => {
      if (reviewId === expandedReviewId) {setExpandedReviewId(null);} 
      else {setExpandedReviewId(reviewId);}
    };

    // Use a set to only store one of each month-year combo
    const uniqueDates = new Set(groupedReviews.prevMonth.map(review => {
      const reviewDate = new Date(review.date);
      return JSON.stringify(new Date(reviewDate.getFullYear(), reviewDate.getMonth()));
    }));

    return (
      <div>
        {groupedReviews.today.length > 0 && (
          <div>
            <div className='row justify-content-center'>
              <div className='col-8 p-2 my-3 align-items-center date-border' >
                <h2>Today</h2>
              </div>
          </div>
            {groupedReviews.today.map((review) => (
              <div className='row mb-5 justify-content-center' key={review.id}>
              {/* If this review is the one that is set to 'expand' */}
              {expandedReviewId === review.id ? (
                <div className='col-8 d-flex align-items-start'>
                  <div className="d-flex justify-content-center w-100">
                    <Details review={review} />
                  </div>
                  <div style={{position: "absolute"}}>
                    <button onClick={() => handleExpand(review.id)} >
                      ∧
                    </button>
                  </div>
                </div>
              ) : (
                  <div className='col-8 d-flex align-items-start'>
                    <div className='d-flex justify-content-center w-100'>
                      <h3 style={{ maxWidth: maxWidth,  height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                    </div>
                    <div style={{position: "absolute"}}>
                      <button onClick={() => handleExpand(review.id)} >
                        ∨
                      </button>
                    </div>
                  </div>

              )}
            </div>
          ))}
          </div>
        )}
        {groupedReviews.yesterday.length > 0 && (
        <div>
          <div className='row justify-content-center'>
            <div className='col-8 p-2 my-3 align-items-center date-border' >
              <h2>Yesterday</h2>
            </div>
          </div>
          {groupedReviews.yesterday.map((review) => (
            <div className='row mb-5 justify-content-center' key={review.id}>
              {/* If this review is the one that is set to 'expand' */}
              {expandedReviewId === review.id ? (
                <div className='col-8 d-flex align-items-start'>
                  <div className="d-flex justify-content-center w-100">
                    <Details review={review} />
                  </div>
                  <div style={{position: "absolute"}}>
                    <button onClick={() => handleExpand(review.id)} >
                      ∧
                    </button>
                  </div>
                </div>
              ) : (
                  <div className='col-8 d-flex align-items-start'>
                    <div className='d-flex justify-content-center w-100'>
                      <h3 style={{ maxWidth: maxWidth,  height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                    </div>
                    <div style={{position: "absolute"}}>
                      <button onClick={() => handleExpand(review.id)} >
                        ∨
                      </button>
                    </div>
                  </div>

              )}
            </div>
          ))}
          </div>
        )}
        {groupedReviews.thisWeek.length > 0 && (
          <div>
            <div className='row justify-content-center'>
              <div className='col-8 p-2 my-3 align-items-center date-border' >
                <h2>This week</h2>
              </div>
            </div>
            {groupedReviews.thisWeek.map((review) => (
              <div className='row mb-5 justify-content-center' key={review.id}>
              {/* If this review is the one that is set to 'expand' */}
              {expandedReviewId === review.id ? (
                <div className='col-8 d-flex align-items-start'>
                  <div className="d-flex justify-content-center w-100">
                    <Details review={review} />
                  </div>
                  <div style={{position: "absolute"}}>
                    <button onClick={() => handleExpand(review.id)} >
                      ∧
                    </button>
                  </div>
                </div>
              ) : (
                  <div className='col-8 d-flex align-items-start'>
                    <div className='d-flex justify-content-center w-100'>
                      <h3 style={{ maxWidth: maxWidth, height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                    </div>
                    <div style={{position: "absolute"}}>
                      <button onClick={() => handleExpand(review.id)} >
                        ∨
                      </button>
                    </div>
                  </div>

              )}
            </div>
          ))}
          </div>
        )}
        {groupedReviews.lastWeek.length > 0 && (
          <div>
            <div className='row justify-content-center'>
              <div className='col-8 p-2 my-3 align-items-center date-border' >
                <h2>Last week</h2>
              </div>
            </div>
            {groupedReviews.lastWeek.map((review) => (
              <div className='row mb-5 justify-content-center' key={review.id}>
              {/* If this review is the one that is set to 'expand' */}
              {expandedReviewId === review.id ? (
                <div className='col-8 d-flex align-items-start'>
                  <div className="d-flex justify-content-center w-100">
                    <Details review={review} />
                  </div>
                  <div style={{position: "absolute"}}>
                    <button onClick={() => handleExpand(review.id)} >
                      ∧
                    </button>
                  </div>
                </div>
              ) : (
                  <div className='col-8 d-flex align-items-start'>
                    <div className='d-flex justify-content-center w-100'>
                      <h3 style={{ maxWidth: maxWidth,  height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                    </div>
                    <div style={{position: "absolute"}}>
                      <button onClick={() => handleExpand(review.id)} >
                        ∨
                      </button>
                    </div>
                  </div>

              )}
            </div>
          ))}
          </div>
        )}
        {groupedReviews.thisMonth.length > 0 && (
          <div>
            <div className='row justify-content-center'>
              <div className='col-8 p-2 my-3 align-items-center' >
                <h2>This month</h2>
              </div>
          </div>
            {groupedReviews.thisMonth.map((review) => (
              <div className='row mb-5 justify-content-center' key={review.id}>
              {/* If this review is the one that is set to 'expand' */}
              {expandedReviewId === review.id ? (
                <div className='col-8 d-flex align-items-start'>
                  <div className="d-flex justify-content-center w-100">
                    <Details review={review} />
                  </div>
                  <div style={{position: "absolute"}}>
                    <button onClick={() => handleExpand(review.id)} >
                      ∧
                    </button>
                  </div>
                </div>
              ) : (
                  <div className='col-8 d-flex align-items-start'>
                    <div className='d-flex justify-content-center w-100'>
                      <h3 style={{ maxWidth: maxWidth,  height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                    </div>
                    <div style={{position: "absolute"}}>
                      <button onClick={() => handleExpand(review.id)} >
                        ∨
                      </button>
                    </div>
                  </div>

              )}
            </div>
          ))}
          </div>
        )}
        {groupedReviews.lastMonth.length > 0 && (
          <div>
            <div className='row justify-content-center'>
              <div className='col-8 p-2 my-3 align-items-center date-border' >
                <h2>Last month</h2>
              </div>
            </div>
            {groupedReviews.lastMonth.map((review) => (
             <div className='row mb-5 justify-content-center' key={review.id}>
              {/* If this review is the one that is set to 'expand' */}
              {expandedReviewId === review.id ? (
                <div className='col-8 d-flex align-items-start'>
                  <div className="d-flex justify-content-center w-100">
                    <Details review={review} />
                  </div>
                  <div style={{position: "absolute"}}>
                    <button onClick={() => handleExpand(review.id)} >
                      ∧
                    </button>
                  </div>
                </div>
              ) : (
                  <div className='col-8 d-flex align-items-start'>
                    <div className='d-flex justify-content-center w-100'>
                      <h3 style={{ maxWidth: maxWidth,  height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                    </div>
                    <div style={{position: "absolute"}}>
                      <button onClick={() => handleExpand(review.id)} >
                        ∨
                      </button>
                    </div>
                  </div>

              )}
            </div>
          ))}
          </div>
        )}
        {groupedReviews.prevMonth.length > 0 && (
          <div>
            {groupedReviews.prevMonth.map((review) => {
              const reviewDate = new Date(review.date);
              const year = reviewDate.getFullYear();
              const month = reviewDate.toLocaleString("default", { month: "short" });
              const date = JSON.stringify(new Date(year, reviewDate.getMonth()));

              // Only display a date one time
              if(uniqueDates.has(date)) {
                uniqueDates.delete(date);
                return (
                  <div key={review.id}>
                    <div className='row justify-content-center'>
                      <div className='col-8 p-2 my-3 align-items-center date-border' >
                        <h2>{month} {year}</h2>
                      </div>
                    </div>
                    <div className='row mb-5 justify-content-center' key={review.id}>
                      {/* If this review is the one that is set to 'expand' */}
                      {expandedReviewId === review.id ? (
                        <div className='col-8 d-flex align-items-start'>
                          <div className="d-flex justify-content-center w-100">
                            <Details review={review} />
                          </div>
                          <div style={{position: "absolute"}}>
                            <button onClick={() => handleExpand(review.id)} >
                              ∧
                            </button>
                          </div>
                        </div>
                      ) : (
                          <div className='col-8 d-flex align-items-start'>
                            <div className='d-flex justify-content-center w-100'>
                              <h3 style={{ maxWidth: maxWidth, height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                            </div>
                            <div style={{position: "absolute"}}>
                              <button onClick={() => handleExpand(review.id)} >
                                ∨
                              </button>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                );
              }
              else {
                return (
                  <div key={review.id}>
                    <div className='row mb-5 justify-content-center' key={review.id}>
                      {/* If this review is the one that is set to 'expand' */}
                      {expandedReviewId === review.id ? (
                        <div className='col-8 d-flex align-items-start'>
                          <div className="d-flex justify-content-center w-100">
                            <Details review={review} />
                          </div>
                          <div style={{position: "absolute"}}>
                            <button onClick={() => handleExpand(review.id)} >
                              ∧
                            </button>
                          </div>
                        </div>
                      ) : (
                          <div className='col-8 d-flex align-items-start'>
                            <div className='d-flex justify-content-center w-100'>
                              <h3 style={{ maxWidth: maxWidth,  height: '40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{review.title}</h3>
                            </div>
                            <div style={{position: "absolute"}}>
                              <button style={{backgroundColor: "#1DA1F2"}}onClick={() => handleExpand(review.id)} >
                                ∨
                              </button>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  };
export default RenderReviews;