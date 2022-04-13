import React from "react";

const FixedBottom = ({ children }) => {
  return (
    <div className=" fixed z-40 bottom-0 w-full left-1/2 -translate-x-1/2 px-[1.6rem] max-w-[70rem] mx-auto pb-[1rem] pt-[.8rem] bg-white">
      <div className=" px-1">{children}</div>
    </div>
  );
};

export default FixedBottom;
