import React from "react";

const BaseLayout = ({ children }) => {
  return <div className=" max-w-[70rem] h-screen overflow-scroll scroll_hide mx-auto relative">{children}</div>;
};

export default BaseLayout;
