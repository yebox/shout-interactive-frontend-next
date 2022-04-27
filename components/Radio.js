import React from "react";

const MyRadio = ({ id, ariaLabel, name, isChecked, onChange }) => {
  return (
    <div>
      {/* <style jsx>{`
        .child * {
          background: red;
        }
      `}</style> */}
      <input
        onClick={(e) => {
          e.stopPropagation();
          console.log("Radio click");
        }}
        aria-labelledby={ariaLabel}
        onChange={(e) => {
          onChange(e);
          console.log("change is", e);
        }}
        type="radio"
        className="hidden peer"
        id={id}
        name={name}
        value={id}
        checked={isChecked}
        aria-label="radio-buttons"
      ></input>
      <label
        htmlFor={id}
        className=" after:-translate-x-1/4 after:-translate-y-1/4 after:animate-pulse after:transition-all after:duration-200 after:w-[10px] after:h-[10px] hover:after:w-[38px] hover:after:h-[38px] after:flex after:top-0 after:left-0 after:absolute after:bg-[#5c55891a] after:opacity-0 hover:after:opacity-100 after:rounded-full peer-checked:radio-checked-style grid cursor-pointer place-items-center place-content-center bg-[#FBFCFE] border border-[#5C5589] rounded-full w-[21px] h-[21px] relative"
      >
        <span className="w-[9px] h-[9px] transition-all duration-1000 rounded-full absolute opacity-0"></span>
      </label>
    </div>
  );
};

export default MyRadio;
