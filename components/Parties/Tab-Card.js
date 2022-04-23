import React, { useState } from "react";

import BtnPrimary from "../Buttons/BtnPrimary";
import Tag from "../Tag";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import CountDown from "../CountDown";
import useWebShare from "../../hooks/useWebShare";
import ModalContainer from "../ModalContainer";
import Notification from "../Notification";

const TabCard = ({ color, text, btnColor, link, partyLink = "https://link", onEnterParty = () => {}, processing = false }) => {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { shareLink } = useWebShare();

  const onShare = async (data) => {
    console.log("in sharing");
    const result = await shareLink(data);
    if (result == "success") {
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
      }, 4000);
      // alert("Link shared successfully!");
    } else {
      // alert("An error has occured:-Cannot share file");
      toggle();
    }
  };

  function toggle() {
    console.log("toggleing...");
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <>
      {/* <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "1.4rem" } }} onClose={toggle} open={open}> */}
      <ModalContainer actionText="Copy" toggle={toggle} onClose={toggle} open={open} headerText="Share Shout Link" icon={<span className="icon-share text-[15px] font-bold"></span>}>
        <h3 className="caption_heavy text-black-default">{partyLink}</h3>
      </ModalContainer>
      {/* </Dialog> */}
      {/* Notification  */}
      <Notification open={notifOpen} icon={<i className="icon-add-user"></i>} title={"Share Shout Link"} message="Shared successfully" color="#FA9330"></Notification>
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
            <i
              onClick={() => {
                // toggle();
                onShare({ url: partyLink, text: "Shout Party link", title: "Shout Party Link" });
              }}
              className="icon-share text-white text-[2rem] cursor-pointer"
            ></i>
          </div>
        </div>

        <div className="grid place-items-center">
          <p className="headline_heavy text-white mt-[2.4rem] max-w-[24.5rem] text-center capitalize">{text}</p>
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
            <BtnPrimary disabled={processing ? true : false} loading={processing} handleClick={onEnterParty} text={"Enter Party"} color={btnColor} link={link}></BtnPrimary>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabCard;
