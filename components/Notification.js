import React, { useEffect, useState } from "react";
import FixedBottom from "./Layouts/FixedBottom";

const Notification = ({ message, type, icon, title, color, open, duration }) => {
  const [notifOpen, setOpen] = useState(open);

  useEffect(() => {
    console.log("Notification status", open);

    if (open && duration) {
      setTimeout(() => {
        setOpen(false);
      }, duration);
    }
    setOpen(open);
  }, [open]);
  return (
    <div className={` fixed transition-all right-6 z-40 rounded-[1rem] bg-white py-[.5rem] px-[.9rem] max-w-[36rem] shadow-sm ${notifOpen ? "top-6 visible" : "-top-full  invisible"}`}>
      <main className="flex items-start">
        <div style={{ backgroundColor: color }} className="w-[3.2rem] h-[3.2rem] !text-white rounded-[1rem] mr-[1.3rem] grid place-items-center">
          {icon}
        </div>
        <div>
          <h2 className="body_heavy text-black-default max-w-[23.1rem] text-ellipsis overflow-hidden">{title}</h2>
          <p className="body_light text-black-light max-w-[22.6rem] text-ellipsis overflow-hidden">{message}</p>
        </div>
      </main>
      {/* Dot */}
      <div style={{ backgroundColor: color }} className="flex w-[.9rem] h-[.9rem] absolute top-[.5rem] right-4 rounded-full"></div>
    </div>
  );
};

export default Notification;
