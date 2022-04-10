import React from "react";
import Link from "next/link";

const HeadersV1 = ({ text, children, link, withborder = true, theme }) => {
  return (
    <header className={`flex items-center justify-between px-[1.4rem] py-[1.2rem] ${withborder == true ? " border-b" : " "}  flex-shrink-0 flex-grow-0`}>
      <Link href={link}>
        <i className={`icon-chevron-left-primary text-primary text-[1.8rem] cursor-pointer ${theme == "white" ? " !text-white" : ""}`}></i>
      </Link>
      <span className={`subheader_heavy ${theme == "white" ? " !text-white" : ""}`}>{text}</span>
      {children}
      {/* <img src="/images/calendar-header.svg"></img> */}
    </header>
  );
};

export default HeadersV1;
