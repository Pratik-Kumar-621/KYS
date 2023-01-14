import React from "react";

const BtnBlock = ({ children, ...restProps }) => {
  return (
    <button {...restProps} className="btn">
      {children}
    </button>
  );
};

export default BtnBlock;
