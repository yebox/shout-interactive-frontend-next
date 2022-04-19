import React, { useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";

const Video = ({ url }) => {
  const [play, setPlay] = useState(false);
  return (
    <>
      <div className="relative overflow-hidden rounded-[1.3rem] w-full h-[45vw]  md:h-[20vw] vidCont">
        <div className=" absolute top-0 left-0 w-full flex">
          {/* <Image className=" object-cover flex" height={400} width={700} alt="thumbnail" src={"https://i.ytimg.com/vi/uuZE_IRwLNI/maxresdefault.jpg"}></Image> */}
          {/* <img className="h-full w-full flex" src="/images/cuppy.jpg"></img> */}
        </div>
        <ReactPlayer
          playIcon={
            <button className=" mb-3 p-[1.1rem] grid place-items-center rounded-[1.3rem] text-white bg-[rgba(255,255,255,0.3)]">
              <span className="icon-play text-[1.8rem] cursor-pointer "></span>
            </button>
          }
          light={"/images/cuppy.jpg"}
          playing={play}
          width={"100%"}
          height={"100%"}
          controls={true}
          url={url}
        />
        {/* <div className=" absolute top-0 left-0 bg-[rgba(10,31,68,0.4)]  w-full grid place-items-center h-full place-content-center">
        <button className=" mb-3 p-[1.1rem] grid place-items-center rounded-[1.3rem] text-white bg-[rgba(255,255,255,0.3)]">
          <span
            onClick={() => {
              setPlay(true);
            }}
            className="icon-play text-[1.8rem] cursor-pointer "
          ></span>
        </button>
        <p className="body_heavy text-white">Play welcome video ⚡️</p>
      </div> */}
        {/* <video className="absolute top-0 left-0 h-full w-full" autoPlay src="https://www.youtube.com/watch?v=uuZE_IRwLNI"></video> */}
      </div>
    </>
  );
};

export default Video;
