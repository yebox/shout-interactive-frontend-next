import React, { useEffect, useState } from "react";
import FixedBtnLayout from "../../components/Layouts/FixedBtnLayout";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tag from "../../components/Tag";
import Link from "next/link";
import { useRouter } from "next/router";

import Video from "../../components/Parties/Video";
import Container from "../../components/Layouts/Container";
import BaseLayout from "../../components/Layouts/Layout";
import BtnPrimary from "../../components/Buttons/BtnPrimary";
import FixedBottom from "../../components/Layouts/FixedBottom";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualParties, getPartiesLoadedStatus, getUpdatedPartiesDetailsId, updateParty } from "../../store/party";
import Upload from "../../components/Upload/Upload";
import Protect from "../../components/Protect";
import useWebShare from "../../hooks/useWebShare";
import Notification from "../../components/Notification";
import useGetParams from "../../hooks/useGetParams";
import { baseInstance } from "../../axios";
import { getUser } from "../../store/user";
import ModalContainer from "../../components/ModalContainer";

const ActivityBox = ({ text, icon, color, link = "/parties/id", action = () => {} }) => {
  return (
    <Link href={link}>
      <div
        onClick={() => {
          action();
        }}
        style={{ background: color }}
        className=" rounded-[1.3rem] py-[1.6rem] px-[1.2rem] flex items-center cursor-pointer"
      >
        <span className="bg-white h-[3.2rem] w-[3.2rem] grid place-items-center rounded-full mr-[1.8rem]">
          <i style={{ color: color }} className={`${icon} text-[1.7rem]`}></i>
        </span>
        <span className="text-white body_heavy">{text}</span>
      </div>
    </Link>
  );
};

const PartyDetail = () => {
  const router = useRouter();
  const individualParties = useSelector(getIndividualParties);
  const partiesLoaded = useSelector(getPartiesLoadedStatus);
  const [party, setParty] = useState({});
  const [updateError, setUpdateError] = useState(false);
  const { shareLink } = useWebShare();
  const [notifOpen, setNotifOpen] = useState(false);
  const { getParams, getUrl } = useGetParams();
  const updatedPartiesId = useSelector(getUpdatedPartiesDetailsId);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const onShare = async (data) => {
    console.log("in sharing");
    const result = await shareLink(data);
    if (result == "success") {
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
      }, 7000);
      // alert("Link shared successfully!");
    } else if (result == "AbortError") {
    } else {
      // alert("An error has occured:-Cannot share file");
      toggle();
    }
  };

  const onCopy = async () => {
    const value = await navigator.clipboard.writeText(router?.asPath);
    console.log("copied value is ", value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  function toggle() {
    console.log("toggleing...");
    open ? setOpen(false) : setOpen(true);
  }

  function formatDate(date) {
    const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${new Date(date).getDate()} ${monthShortNames[new Date(date).getMonth()]}, ${new Date(date).getHours()}:00`;
  }

  // useEffect(() => {
  //   const getPartyDetail = (parties, id) => {
  //     const partyArr = parties.filter((el) => {
  //       return el.id == id;
  //     });
  //     console.log(parties);
  //     console.log("party detail is", partyArr);
  //     return partyArr[0];
  //   };

  //   const getMoreDetailsParty = async (partyId, userId) => {
  //     try {
  //       const resp = await baseInstance.post("/party/details", {
  //         id: partyId,
  //         user: userId,
  //       });
  //       setUpdateError(false);
  //       console.log("party detials", resp.data.party);
  //       dispatch(updateParty(resp.data.party, partyId, resp.data.party.type));
  //     } catch (error) {
  //       console.log("There was an error geting more party details");
  //       setUpdateError(true);
  //     }
  //   };

  //   const party = getPartyDetail(individualParties, router.query.id);
  //   setParty(party);
  //   if (party?.id && user?.user?.id && !updatedPartiesId.includes(party?.id)) {
  //     getMoreDetailsParty(party.id, user.user.id);
  //   }
  //   console.log(party);
  // }, [router.query, partiesLoaded, updatedPartiesId, user]);

  useEffect(() => {
    const getPartyDetail = (parties, id) => {
      const partyArr = parties.filter((el) => {
        return el.id == id;
      });
      console.log(parties);
      console.log("party detail is", partyArr);
      return partyArr[0];
    };
    const party = getPartyDetail(individualParties, router.query.id);
    setParty(party);
    console.log(party);
  }, [router.query, partiesLoaded, user]);

  useEffect(() => {
    console.log("upated ids in details use effect", updatedPartiesId);
    console.log("rotue is", router);
  }, [updatedPartiesId]);

  useEffect(() => {
    if (router.query.message) {
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
        router.replace(`/parties/${router?.query?.id}`, undefined, { shallow: true });
      }, 10000);
    }
  }, [router.query]);

  return (
    <>
      <Notification open={copied} icon={<i className="icon-info-circle"></i>} title={"Copy Link"} message="Link copied to clipboard" color="green"></Notification>
      <Notification open={notifOpen} icon={<i className="icon-info-circle text-[1.6rem]"></i>} title={"Party Created"} message="Party Created successfully!" color="green"></Notification>

      <ModalContainer
        // onAction={() => {
        //   onCopy();
        //   toggle();
        // }}
        actionText="Copy"
        toggle={toggle}
        // onClose={toggle}
        open={open}
        headerText="Share Shout Link"
        icon={<span className="icon-share text-[15px] font-bold"></span>}
      >
        {/* <h3 className="caption_heavy text-black-default">{"Party link"}</h3> */}
        <div className="relative">
          <input
            // disabled
            value={router?.asPath}
            readOnly={true}
            className={`flex h-[48px] translate-y-8 mb-[10px] max-w-full min-w-[200px] w-full text-black-default body_light focus:border-none focus:border-transparent focus:outline-0 focus:outline-transparent border rounded-[6px] px-[8px] py-[14px] pr-[5rem]`}
          ></input>
          <button
            onClick={() => {
              onCopy();
              toggle();
            }}
            className=" absolute right-6 top-full -translate-y-5 text-black-default text-lg"
          >
            COPY
          </button>
        </div>
      </ModalContainer>
      {/* <FixedBtnLayout text={"Join Party"} btnColor={"#3CC13B"}> */}
      <Protect>
        {/* <Notification open={notifOpen} icon={<i className="icon-add-user"></i>} title={"Share Shout Link"} message="Shared successfully" color="#FA9330"></Notification> */}
        <Notification open={updateError} icon={<i className="icon-info-circle"></i>} title={"Update"} message="Update Party Error" color="red"></Notification>

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
                {/* <Link href="/parties/edit">
                  <i className="icon-edit text-white text-[1.8rem] cursor-pointer"></i>
                </Link> */}
              </header>

              <div className="grid place-items-center">
                {/* <p className="headline_heavy text-white mt-[2.4rem] max-w-[24.5rem] text-center">Party with Mitchell Nwabueze 🎉 </p> */}
                <p className="headline_heavy text-white mt-[2.4rem] max-w-[24.5rem] text-center capitalize">{party?.name} </p>
                <div className="my-[1.6rem] mb-[3.4rem]">
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                </div>
                <Tag>{formatDate(party?.date)}</Tag>
              </div>
            </Container>
          </section>

          {/* Welcome message */}
          <section className="py-[2.4rem]">
            <Container>
              <p className="subheader_heavy mb-3">Welcome message</p>
              {party?.video ? <Video url={party?.video}></Video> : <Upload withLabel={false}></Upload>}
            </Container>
          </section>

          {/* Activities  */}
          <section className="pb-[2.4rem]">
            <Container>
              <p className="subheader_heavy mb-3">Activities</p>
              <div className="grid grid-cols-2 gap-4">
                <ActivityBox color={"#FA9330"} icon="icon-users-profile" text="Guestlist" link={`/guest-list?id=${party?.id}`}></ActivityBox>
                <ActivityBox color={"#FA4A0C"} icon="icon-gift-box" text="Gift goal" link={`/gift-goal/${party?.id}`}></ActivityBox>
                <ActivityBox color={"#B57BFF"} icon="icon-music" text="Musicpost" link={`/music-post?id=${party?.id}`}></ActivityBox>
                <ActivityBox
                  action={() => {
                    onShare({ url: "Party Link", text: "Shout Party link", title: "Shout Party Link" });
                  }}
                  color="#110066"
                  icon="icon-share"
                  text="Share"
                  link={`/parties/${getParams("id")}`}
                ></ActivityBox>
              </div>
            </Container>
          </section>

          {/* About party */}
          <section className="pb-[2.4rem] mb-[10rem]">
            <Container>
              <p className="subheader_heavy mb-3">About party</p>
              <p className="body_light text-primary">{party?.description} </p>
            </Container>
          </section>

          <FixedBottom>
            <BtnPrimary text={"Join Party"} color={"#14B363"} link={`/livestream/${router.query.id}`}></BtnPrimary>
          </FixedBottom>
        </BaseLayout>
      </Protect>
      {/* </FixedBtnLayout> */}
    </>
  );
};

export default PartyDetail;
