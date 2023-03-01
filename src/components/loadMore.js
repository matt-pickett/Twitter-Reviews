import React, { useEffect, useRef } from 'react';

const LoadMore = ({ query, total, handleLoading, handleDataLoadMore, numResults, setNumResults }) => {
    
    const prevNumResults = useRef(numResults);
    useEffect(() => {
        async function fetchData() {
            handleLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${query}&count=${numResults}`);
                const data = await response.json();
                handleDataLoadMore(data);
            } catch (error) {
                console.error(error)
                throw new Error("An error occurred while loading more results.");
            } finally {
                handleLoading(false);
            }
        };
        
        // Only make a new call if the number of results has gone up
        if (numResults !== prevNumResults.current) {
            fetchData();
            prevNumResults.current = numResults;
        }
    }, [numResults, handleDataLoadMore, handleLoading, query]);


    // Get 25 more reviews
    async function handleLoadMore() {
        setNumResults(numResults+25);
    }

    // Check if there are any reviews to be loaded
    function hasMoreData(total, numResults) {
        return total >= numResults;
    }

    return (
        <div className='row pb-5 justify-content-center'>
            <div className='col-8 px-0 align-items-center date-border' >
                {(hasMoreData(total, numResults) && 
                    <button className="w-100 h-100 py-2" style={{border: "3px"}} onClick={() => handleLoadMore()}>Load More</button> 
                )}
            </div>
        </div>
        // <div className="pb-5">
        //     {(hasMoreData(total, numResults) && 
        //         <button onClick={() => handleLoadMore()}>Load More</button> 
        //     )}
        // </div>
    );
};
export default LoadMore;
