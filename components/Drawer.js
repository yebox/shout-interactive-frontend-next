import { SwipeableDrawer } from "@mui/material";
import React from "react";

const Drawer = ({ children, open, onClose = () => {}, onOpen = () => {} }) => {
  return (
    <SwipeableDrawer sx={{ "& .MuiPaper-root": { maxWidth: "70rem", margin: "auto" } }} anchor={"bottom"} open={open} onClose={onClose} onOpen={onOpen}>
      <div className="p-[1.6rem] pb-[2.4rem] relative">
        <i
          onClick={() => {
            onClose();
          }}
          className="icon-cancel text-black-default text-[1.4rem] absolute right-[1.6rem] top-[1.6rem] cursor-pointer"
        ></i>
        {/* Puller */}
        <div className=" h-[.8rem] w-[4.8rem] mb-[1rem] rounded-full bg-black-lightest-2 mx-auto"></div>
        {children}
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
