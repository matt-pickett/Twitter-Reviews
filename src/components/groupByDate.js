import React from 'react';
import RenderReviews from './renderReviews';

const Reviews = ({ reviews }) => {
    
    // Group the reviews by time
    const groupReviews = (reviews) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const thisWeekDiff = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1);
        const thisWeek = new Date(new Date(today).setDate(thisWeekDiff));
        const lastWeek = new Date(thisWeek);
        lastWeek.setDate(thisWeek.getDate() - 7);
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

        try {
          return reviews.reduce((accumulator, curr) => {
            const currDateAndTime = new Date(curr.date);
            const currDate = new Date(currDateAndTime.getFullYear(), currDateAndTime.getMonth(), currDateAndTime.getDate());
            const difference = (Date.parse(today) - Date.parse(currDate)) / 86400000;
            if (isNaN(currDate.getTime())) {
              throw new Error('Invalid date.');
            } else if (difference === 0) {
              accumulator.today.push(curr);
            } else if (difference === 1) {
              accumulator.yesterday.push(curr);
            } else if (currDate >= thisWeek && currDate < today) {
              accumulator.thisWeek.push(curr);
            } else if (currDate >= lastWeek && currDate < thisWeek) {
              accumulator.lastWeek.push(curr);
            } else if (currDate >= thisMonth && currDate < lastWeek) {
              accumulator.thisMonth.push(curr);
            } else if (currDate >= lastMonth && currDate < thisMonth) {
              accumulator.lastMonth.push(curr);
            } else if (currDate < lastMonth) {
              accumulator.prevMonth.push(curr);
            }
            return accumulator;
          }, {
            today: [],
            yesterday: [],
            thisWeek: [],
            lastWeek: [],
            thisMonth: [],
            lastMonth: [],
            prevMonth: []
          });
      } catch (error) {
        console.error(error.message);
        throw new Error('An error occurred while processing the reviews.');
      }
    };

  return (
    <div>
      <RenderReviews groupedReviews={groupReviews(reviews)}></RenderReviews> 
    </div>
  );
};
export default Reviews;