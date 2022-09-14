import React from "react";
import "./listItem.css";

const ListItem = ({ item, name, clickHandlerFunc, ind }) => {
  let onClickHandler = function () {
    clickHandlerFunc(name, ind);
  };

  return (
    <div
      className="list-item-design-container"
      onClick={(e) => {
        onClickHandler();
      }}
    >
      <h4 className="list-item-design">{item}</h4>
    </div>
  );
};

export default ListItem;
