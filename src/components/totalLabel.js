import React from 'react';

const TotalLabel = ({ count }) => {
    
    return (
        <div className='row pt-4'>
            <div className='col-2'></div>
            <div className="col-4 px-0 d-flex justify-content-start">
                <div className='text-start'>
                    <span>Showing <b className='twitter-colors'>{count}</b> reviews</span>
                </div>
            </div>
       </div>
    );
};
export default TotalLabel;
