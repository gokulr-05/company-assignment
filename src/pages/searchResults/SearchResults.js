import React from "react";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";
import SearchResultsItem from "../searchResults/searchResultsItem/SearchResultsItem";
import "./searchResults.css";

let SearchResults = function () {
  let searchInput = useSelector((state, action) => {
    return state.searchReducer.searchInput;
  });

  let isLoggedIn = useSelector((state, action) => {
    return state.authReducer.isLoggedIn;
  });
  let searchResultsArr = useSelector((state, action) => {
    return state.searchReducer.searchResultsArr;
  });
  return (
    <div className="search-list-area">
      <div className="search-list-sec">
        <div>
          <div className="search-list-container">
            <h1>Search Results: "{searchInput}"</h1>
            {searchResultsArr.length === 0 ? (
              <div>
                {" "}
                <h4 className="text-center text-muted">No match found!</h4>
              </div>
            ) : (
              ""
            )}
            <SearchResultsItem data={searchResultsArr} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
