import React, { useState, useEffect } from "react";
import { PageLoader } from './pageLoader';
import Reviews from "./groupByDate";
import LoadMore from "./loadMore";
import TotalLabel from "./totalLabel";
import Filter from "./filter";

function Results() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numResults, setNumResults] = useState(25);
    const [query, setQuery] = useState("");

    const [DataFilter, setDataFilter] = useState([]);
    const [DataLoadMore, setDataLoadMore] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [rating, setRating] = useState('');
    const [params, setParams] = useState({
        rating: "",
        keyword: ""
    });

    // Make an initial call to set the data
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}`);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error)
                throw new Error("An error occurred while fetching the results.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
  }, []);
    
    const handleQuery = (value) => {
        setQuery(value);
    };

    const handleLoading = (isLoading) => {
        setLoading(isLoading);
    };

    const handleDataFilter = (value) => {
        setDataFilter(value);
    };

    // Set the data to be the data from filter
    useEffect(() => {
        setData(DataFilter)
    }, [DataFilter]);

    const handleDataLoadMore = (value) => {
        setDataLoadMore(value);
    };

    // Set the data to be the data from load more
    useEffect(() => {
        setData(DataLoadMore)
    }, [DataLoadMore]);

    // Reset paging every time a filter changes
    useEffect(() => {
        setNumResults(25)
    }, [query, setNumResults]);

    if(loading) {
        return <PageLoader />;
    }

    return (
        <div>
            <h1 className="pt-3" style={{color: "#1DA1F2"}}>Reviews for Twitter</h1>
            <Filter
                handleDataFilter={handleDataFilter}
                handleQuery={handleQuery}
                handleLoading={handleLoading}
                keyword={keyword}
                setKeyword={setKeyword}
                rating={rating}
                setRating={setRating}
                params={params}
                setParams={setParams}
            />
            <TotalLabel count={data.reviews.length}/>
            <Reviews reviews={data.reviews}/>
            <LoadMore 
                query={query}
                total={data.total}
                handleLoading={handleLoading}
                handleDataLoadMore={handleDataLoadMore}
                numResults={numResults} 
                setNumResults={setNumResults}
            />
    </div>
  );
};

export default Results;