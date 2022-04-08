import React from "react";

const BaseLayout = ({ children }) => {
  return <div className=" max-w-[70rem] mx-auto p-[1.6rem]">{children}</div>;
};

export default BaseLayout;
