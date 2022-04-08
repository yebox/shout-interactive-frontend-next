import React from "react";
import BtnPrimary from "../Buttons/BtnPrimary";
import Tag from "../Tag";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CountDown from "../CountDown";

const TabCard = ({ color, text, btnColor, link }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        background: `${color == "#3CC13B" ? "url(/images/bg-green.png)" : "url(/images/bg-blue.png)"}`,
      }}
      className="p-[1.8rem] py-[2.2rem] rounded-3xl !bg-cover bg-no-repeat"
    >
      <div className="flex justify-between">
        <CountDown></CountDown>

        {/* <Tag>Party starts in 04H:13M:5S</Tag> */}
        <div className=" bg-[rgba(255,255,255,0.3)] rounded-3xl p-[.8rem] grid place-items-center place-content-center">
          {/* <Image height={24} width={24} alt="share" src="/images/share.svg"></Image> */}
          <i className="icon-share text-white text-[2rem]"></i>
        </div>
      </div>

      <div className="grid place-items-center">
        <p className="headline_heavy text-white mt-[2.4rem] max-w-[24.5rem] text-center">{text}</p>
        <div className="my-[2.6rem]">
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </div>

        <div className="w-[14rem]">
          <BtnPrimary text={"Enter Party"} color={btnColor} link={link}></BtnPrimary>
        </div>
      </div>
    </div>
  );
};

export default TabCard;
