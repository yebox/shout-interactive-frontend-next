import React from "react";
import BtnPrimary from "../Buttons/BtnPrimary";

const FixedBtnLayout = ({ children, text, action = () => {}, btnColor = "#3CC13B" }) => {
  return (
    <div className=" max-w-[70rem] mx-auto pb-[1.6rem] relative h-screen flex flex-col">
      {children}
      <div className=" absolute z-50 bottom-[2.4rem] w-full left-1/2 -translate-x-1/2 px-[1.6rem]">
        <BtnPrimary text={text} color={btnColor}></BtnPrimary>
      </div>
    </div>
  );
};

export default FixedBtnLayout;
