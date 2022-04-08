import React from "react";

const Tag = ({ children }) => {
  return (
    <div className=" bg-[rgba(255,255,255,0.3)] rounded-xl px-[.8rem] py-[.4rem] grid place-items-center place-content-center">
      <span className="caption_heavy text-white">{children}</span>
    </div>
  );
};

export default Tag;
