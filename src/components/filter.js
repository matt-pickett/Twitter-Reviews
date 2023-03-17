import React, { useEffect, useCallback, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Filter = ({ handleDataFilter, handleLoading, handleQuery, keyword, setKeyword, rating, setRating, params, setParams }) => {
  const delayTimer = useRef(null);
  const prevParams = useRef(params);

  useEffect(() => {
    async function fetchData() {
      handleLoading(true);
      try {
          const query = getQuery(params);
          handleQuery(query)
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}${query}`);
          const data = await response.json();
          handleDataFilter(data);
      } catch (error) {
          console.error(error)
          throw new Error("An error occurred while fetching the search results.");
      } finally {
        handleLoading(false)
      }
    }

    // Clear existing timeout
    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
    }
    // Wait 1 second since changing a param
    delayTimer.current = setTimeout(() => {

      // Only call make API call if params changed
      if (params.rating !== prevParams.current.rating ||params.keyword !== prevParams.current.keyword) {
        prevParams.current = params;
        fetchData();
      }
    }, 1000);
  }, [params, handleDataFilter, handleQuery, handleLoading]);

  // Concatenate keyword and rating into one query
  function getQuery(params) {
    try {
      if (!params) {
        throw new Error("No params provided.");
      }

      const holdSearchTerm = params.keyword ? params.keyword : "";
      let holdRating = "";
      if (params.keyword && params.rating) {
        holdRating = `&${params.rating}`;
      } else if (!params.keyword && params.rating) {
        holdRating = `${params.rating}`;
      }

      return holdSearchTerm + holdRating;
    } catch (error) {
      console.error(error);
      return "";
  } 
  }

  // Update only the values that changed in params
   const updateParams = useCallback((value) => {
    setParams((prev) => {
      return { ...prev, ...value };
    });
  }, [setParams]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  useEffect(() => {
    updateParams({keyword: keyword ? `q=${keyword}` : ""});
  }, [keyword, updateParams]);

  useEffect(() => {
    updateParams({rating: rating ? `stars=${rating}` : ""});
  }, [rating, updateParams]);
  
  return (
      <div className="row justify-content-center pt-3">
        <div className="col-sm-6 col-8 px-0 d-flex justify-content-start">
          <label className="showCaret">
              <div className="text-start">
                Filter by keyword:&nbsp;
              </div>
                <input className="text-box" type="text" value={keyword} style={{width: "45vw", border: "2px solid #1DA1F2", borderRadius: "2px"}} onChange={handleKeywordChange} />
          </label>
        </div>
        <div className="col-sm-2 col-8 p-0 d-flex justify-content-sm-end justify-content-start">
          <label>
              <div className="text-start">
                Filter by rating:&nbsp;
              </div>
              <div>
                <select className="text-box me-sm-0 me-5" style={{ height: "29.2px", width: "20vw", border: "2px solid #1DA1F2", borderRadius: "2px"}} value={rating} onChange={handleRatingChange}>
                <option value="">All ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
                </select>
              </div>
          </label>
        </div>
      </div>
  );
}

export default Filter;