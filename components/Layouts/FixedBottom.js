import React from "react";

const FixedBottom = ({ children }) => {
  return <div className=" fixed z-40 bottom-[2.4rem] w-full left-1/2 -translate-x-1/2 px-[1.6rem] max-w-[70rem] mx-auto">{children}</div>;
};

export default FixedBottom;
