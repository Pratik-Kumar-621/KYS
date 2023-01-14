import React, { forwardRef } from "react";

const Input = forwardRef(({ label, children, ...restprops }, ref) => {
  return (
    <div className="input_group">
      <label htmlFor={label} className="label">
        {label}
      </label>
      <input ref={ref} {...restprops} className="input" />
    </div>
  );
});

export default Input;
