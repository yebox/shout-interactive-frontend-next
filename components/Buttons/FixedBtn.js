import React from "react";
import BtnPrimary from "./BtnPrimary";

const FixedBtn = ({ text, color, link }) => {
  return (
    <div className=" fixed z-40 bottom-[2.4rem] w-full left-1/2 -translate-x-1/2 px-[1.6rem] max-w-[70rem] mx-auto">
      <BtnPrimary text={text} color={color} link={link}></BtnPrimary>
    </div>
  );
};

export default FixedBtn;
