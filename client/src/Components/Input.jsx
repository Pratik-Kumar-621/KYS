import React, { forwardRef } from "react";

const Input = forwardRef(({ label, children, ...restprops }, ref) => {
  return (
    <div className="flex flex-col xl:mt-6 md:mt-3">
      <label htmlFor={label} className="label">
        {label}
      </label>
      <input ref={ref} {...restprops} className="input" />
    </div>
  );
});

export default Input;
