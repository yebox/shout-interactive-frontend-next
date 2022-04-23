import React, { useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layouts/Layout";
import Avatar from "@mui/material/Avatar";
import WebCam from "../../components/WebCam";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPartiesLoadedStatus, getShoutParties } from "../../store/party";
import { useSelector } from "react-redux";
import Protect from "../../components/Protect";
import ReactPlayer from "react-player/lazy";

const Livestream = () => {
  const [chats, setChats] = useState(["Love and Hate", " Opor opor tonight we are doing Dorime!!🍾🍾🍾🍾", "Happy Birthday David!! 🎉🎉🎊"]);
  const messageRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [showVid, setShowVid] = useState(true);
  const router = useRouter();
  const [party, setParty] = useState(null);
  const shoutParties = useSelector(getShoutParties);
  const partiesLoaded = useSelector(getPartiesLoadedStatus);

  const onMessage = (message) => {
    console.log("message is", message, chatBoxRef.current.scrollHeight);
    setChats((messages) => [...messages, message]);
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    messageRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      console.log("Distruotinio");
    };
  }, []);

  useEffect(() => {
    const getPartyDetail = (parties, id) => {
      const partyArr = parties.filter((el) => {
        return el.id == id;
      });
      console.log(parties);
      console.log("party detail is", partyArr);
      return partyArr[0];
    };

    const party = getPartyDetail(shoutParties, router.query.id);
    setParty(party);
    console.log(party);
  }, [router.query, partiesLoaded]);

  return (
    <>
      <Protect>
        <BaseLayout>
          <div className="livestream-ads h-full">
            <ReactPlayer
              playIcon={
                <button className=" mb-3 p-[1.1rem] grid place-items-center rounded-[1.3rem] text-white bg-[rgba(255,255,255,0.3)]">
                  <span className="icon-play text-[1.8rem] cursor-pointer "></span>
                </button>
              }
              loop={true}
              playing={true}
              width={"100%"}
              height={"100%"}
              url="/ads.mp4"
            />
          </div>
        </BaseLayout>
        {/* <BaseLayout> */}
        {false && (
          <>
            <WebCam showVidW={showVid}></WebCam>
            <div
              style={{
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 77.02%, #000000 127.65%)",
              }}
              className="w-full h-screen px-[1.6rem] pt-[2.4rem] pb-[3.4rem] relative bg-slate-400 flex flex-col max-w-[70rem] mx-auto"
            >
              {/* Header Section */}
              <section className="flex items-center top-0 left-0 w-full justify-between relative ">
                <select className=" bg-see-through rounded-[2rem] px-[.8rem] py-[.4rem] caption_heavy text-white focus:outline-none">
                  <option>My party</option>
                  <option>Everyone</option>
                </select>

                <div className="flex items-center mr-10 cursor-pointer">
                  <i className="icon-user-single-stream mr-3 text-[1.6rem] text-white "></i>
                  <span className="body_heavy text-white">900</span>
                </div>

                <Link href="/parties/dd">
                  <i
                    onClick={() => {
                      setShowVid((val) => !val);
                      console.log("show vid change");
                    }}
                    className="icon-cancel text-white text-[2.1rem] cursor-pointer"
                  ></i>
                </Link>
              </section>
              {/* Sidebar Section */}
              <section className=" relative top-[5.5rem] right-0 ml-auto flex flex-col gap-[1.6rem]">
                <div className=" bg-see-through rounded-[1rem] px-[.8rem] py-[1rem] ml-auto w-[4.4rem] h-[4.4rem] grid place-items-center cursor-pointer">
                  <i className="icon-add-user text-white text-[2.1rem]"></i>
                </div>
                <div className=" bg-see-through rounded-[1rem] px-[.8rem] py-[1rem] ml-auto w-[4.4rem] h-[4.4rem] grid place-items-center cursor-pointer">
                  <i className="icon-gift-box text-white text-[2.1rem]"></i>
                </div>
                <div className=" bg-see-through rounded-[1rem] px-[.8rem] py-[1rem] ml-auto w-[4.4rem] h-[4.4rem] grid place-items-center cursor-pointer">
                  <i className="icon-music text-white text-[2.1rem]"></i>
                </div>
                <div
                  onClick={() => {
                    console.log("set cam to true");
                    setShowVid((val) => true);
                  }}
                  className=" bg-see-through rounded-[1rem] px-[.8rem] py-[1rem] ml-auto w-[4.4rem] h-[4.4rem] grid place-items-center cursor-pointer"
                >
                  <i className="icon-add-video text-white text-[1.8rem]"></i>
                </div>
              </section>

              {/* Chatbox Section */}
              <section className="max-h-[50vh] min-h-[10rem] mt-auto flex flex-col items-center fixed bottom-4  w-full px-[1.6rem] max-w-[70rem] mx-auto left-1/2 -translate-x-1/2">
                {/* Chats */}
                <div ref={chatBoxRef} className="w-full overflow-scroll scroll_hide pb-[5.5rem] snap-mandatory snap-y snap-start ">
                  {chats.map((chat, i) => {
                    return (
                      <div key={i} className="flex items-center mb-[1.6rem]">
                        {/* <img className="h-[3.4rem] w-[3.4rem]" src="/"></img> */}
                        <Avatar sx={{ borderRadius: "10px" }} alt="Remy Sharp" src="/broken-image.jpg" />
                        <p className="ml-[1rem] caption_heavy text-white max-w-[22.8rem]">
                          <span className="text-[#C0C9D2]">Levels Akinkunle</span>
                          <span> {chat}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="flex items-center mt-auto w-full">
                  {/* Input Message */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onMessage(messageRef.current.value);
                    }}
                    className=" flex items-center relative flex-1"
                  >
                    <input
                      ref={messageRef}
                      className="rounded-[1.5rem] placeholder:text-white w-full p-[1.2rem] caption_light border-2 bg-transparent text-white border-white focus:outline focus:outline-1 focus:outline-violet-300"
                      placeholder="Message here"
                    ></input>
                    <button className="absolute right-[1.3rem] grid place-items-center">
                      <i className="icon-send text-white text-[1.7rem] "></i>
                    </button>
                  </form>
                  {/* Like */}
                  <button className="ml-[1.6rem]">
                    <i className="icon-love text-[2.8rem] text-white"></i>
                  </button>
                </div>
              </section>
            </div>
          </>
        )}
      </Protect>
    </>
  );
};

export default Livestream;
