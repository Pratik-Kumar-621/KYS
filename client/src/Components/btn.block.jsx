import React from "react";

export default function BtnBlock({ children, ...restProps }) {
  return (
    <button {...restProps} className="btn">
      {children}
    </button>
  );
}
