import React from "react";

const GetDate = ({ date }) => {
    const last = new Date(date);
    const day = last.getDate();
    const month = last.toLocaleString('default', { month: 'long' });
    const year = last.getFullYear();
    let militaryHour = last.getHours();
    const timeVal = (militaryHour >= 12) ? "PM" : "AM";
    const hour = parseHour(militaryHour);
    const minute = (last.getMinutes()<10?'0':'') + last.getMinutes();

    function parseHour(hour) {
        if (hour > 12) {
        hour = hour - 12;
        }
        else if (hour === 0) {
        hour = 12;
        }
        return hour;
    }

    return (
        <span className="text-muted">{month} {day}, {year} @ {hour}:{minute} {timeVal}</span>
    );
}

export default GetDate;