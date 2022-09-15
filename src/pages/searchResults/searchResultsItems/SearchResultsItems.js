// import React, { useState, useEffect } from "react";
// import request, { baseURL, API_KEY, image_base_url } from "../../../request";
// import "./recommendItems.css";
// import Spinner from "../../../pages/component/spinner/Spinner";
// // import shortid from "shortid";
// // import RecommendItemModal from "../recommendItemModal/RecommendItemModal";
// // import RecommendItem from "../recommendItem/RecommendItem";
// import SearchResultsItem from "../searchResultsItem/SearchResultsItem";

// // let obj = {
// //   "action movies": request.fetchActionMovies,
// //   "top rated": request.fetchTopRated,
// //   "comedy movies": request.fetchComedyMovies,
// //   "horror movies": request.fetchHorrorMovies,
// //   documentaries: request.fetchDocumantaries,
// //   "thriller movies": request.fetchNetflixOriginals,
// // };

// const SearchResultsItems = () => {
//   // console.log("name=", name);
//   // let [data, setData] = useState(null);

//   // useEffect(() => {
//   //   async function asyncFetch() {
//   //     let url = `${baseURL}${obj[name.toLowerCase()]}`;
//   //     console.log("url=", url);
//   //     let res = await fetch(url);
//   //     let value1 = await res.json();
//   //     console.log("value1=", value1);
//   //     setData(value1.results);
//   //     // console.log("res=", res);
//   //   }
//   //   asyncFetch();
//   // }, []);

//   // if (data === null) {
//   //   return <Spinner />;
//   // }

//   return (
//     <div className=" my-5">
//       <div className="">
//         <h1 className="mb-5">{name}</h1>

//         <SearchResultsItem data={data} />
//       </div>
//     </div>
//   );
// };

// export default SearchResultsItems;
