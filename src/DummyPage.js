import { useSelector } from "react-redux";

let DummyPage = function () {
  let data = useSelector((state, action) => {
    return state.searchReducer.searchResultsArr;
  });

  let obj = {};

  return <div>a</div>;
};

export default DummyPage;
