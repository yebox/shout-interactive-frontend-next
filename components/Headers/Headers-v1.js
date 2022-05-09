import React from "react";
import Link from "next/link";

const HeadersV1 = ({ text, children, link, withborder = true, theme, mb = true }) => {
  return (
    <header
      className={`flex items-center ${mb ? "mb-[1.6rem] " : ""} sticky top-0 ${theme ? "" : "bg-white"}  z-40 justify-between px-[1.4rem] py-[1.2rem] ${
        withborder == true ? " border-b" : " "
      }  flex-shrink-0 flex-grow-0`}
    >
      <Link href={link} scroll={false}>
        <i className={`icon-chevron-left-primary text-black-default text-[1.8rem] cursor-pointer ${theme == "white" ? " !text-white" : ""}`}></i>
      </Link>
      <span className={`subheader_heavy !text-[2rem] ${theme == "white" ? " !text-white" : ""}`}>{text}</span>
      <div className=" cursor-pointer flex items-center">{children}</div>
      {/* <img src="/images/calendar-header.svg"></img> */}
    </header>
  );
};

export default HeadersV1;
