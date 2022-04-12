import React from "react";
import FixedBtnLayout from "../../components/Layouts/FixedBtnLayout";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tag from "../../components/Tag";
import Link from "next/link";

import Video from "../../components/Parties/Video";
import Container from "../../components/Layouts/Container";
import BaseLayout from "../../components/Layouts/Layout";
import BtnPrimary from "../../components/Buttons/BtnPrimary";

const ActivityBox = ({ text, icon, color, link = "/parties/id" }) => {
  return (
    <Link href={link}>
      <div style={{ background: color }} className=" rounded-[1.3rem] py-[1.6rem] px-[1.2rem] flex items-center cursor-pointer">
        <span className="bg-white h-[3.2rem] w-[3.2rem] grid place-items-center rounded-full mr-[1.8rem]">
          <i style={{ color: color }} className={`${icon} text-[1.7rem]`}></i>
        </span>
        <span className="text-white body_heavy">{text}</span>
      </div>
    </Link>
  );
};

const PartyDetail = () => {
  return (
    <>
      {/* <FixedBtnLayout text={"Join Party"} btnColor={"#3CC13B"}> */}
      <BaseLayout>
        {/* Header Details */}
        <section className="bg-[#FA9330] py-[2.5rem] pb-[3.2rem] bg-[url(/images/bg-orange.png)] bg-no-repeat bg-cover">
          <Container>
            <header className="flex items-center justify-between  pb-[1.2rem] flex-shrink-0 flex-grow-0">
              {/* <img src="/images/chevron-left-primary.svg"></img> */}
              <Link href="/parties">
                <i className="icon-chevron-left-primary cursor-pointer text-white text-[1.8rem]"></i>
              </Link>
              {/* <img src="/images/edit.svg"></img> */}
              <Link href="/parties/edit">
                <i className="icon-edit text-white text-[1.8rem] cursor-pointer"></i>
              </Link>
            </header>

            <div className="grid place-items-center">
              <p className="headline_heavy text-white mt-[2.4rem] max-w-[24.5rem] text-center">Party with Mitchell Nwabueze 🎉 </p>
              <div className="my-[1.6rem] mb-[3.4rem]">
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </div>
              <Tag>19 Nov, 7:00</Tag>
            </div>
          </Container>
        </section>

        {/* Welcome message */}
        <section className="py-[2.4rem]">
          <Container>
            <p className="subheader_heavy mb-3">Welcome message</p>
            <Video></Video>
          </Container>
        </section>

        {/* Activities  */}
        <section className="pb-[2.4rem]">
          <Container>
            <p className="subheader_heavy mb-3">Activities</p>
            <div className="grid grid-cols-2 gap-4">
              <ActivityBox color={"#FA9330"} icon="icon-users-profile" text="Guestlist" link="/guest-list"></ActivityBox>
              <ActivityBox color={"#FA4A0C"} icon="icon-gift-box" text="Gift goal" link="/gift-goal"></ActivityBox>
              <ActivityBox color={"#B57BFF"} icon="icon-music" text="Musicpost" link="/music-post"></ActivityBox>
              <ActivityBox color="#110066" icon="icon-share" text="Share"></ActivityBox>
            </div>
          </Container>
        </section>

        {/* About party */}
        <section className="pb-[2.4rem] mb-[10rem]">
          <Container>
            <p className="subheader_heavy mb-3">About party</p>
            <p className="body_light text-primary">Come with your dancing shoes on, the DJ has promised a great line up and there’s a surprise celebrity guest 👀 </p>
          </Container>
        </section>

        <div className=" fixed z-40 bottom-[2.4rem] w-full left-1/2 -translate-x-1/2 px-[1.6rem] max-w-[70rem] mx-auto">
          <BtnPrimary text={"Join Party"} color={"#14B363"} link="/livestream"></BtnPrimary>
        </div>
      </BaseLayout>
      {/* </FixedBtnLayout> */}
    </>
  );
};

export default PartyDetail;
