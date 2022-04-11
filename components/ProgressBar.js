import React from "react";

const ProgressBar = ({ color = "#F03738", value }) => {
  return (
    <div className="relative h-[.8rem] rounded-[1rem] overflow-hidden w-full flex">
      <div className=" absolute top-0 left-0 bg-[#E5E9EC] w-full flex h-full"></div>
      <div style={{ backgroundColor: color, width: `${value}%` }} className=" rounded-[1rem] absolute top-0 left-0 w-full flex h-full"></div>
    </div>
  );
};

export default ProgressBar;
