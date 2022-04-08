import React from "react";
import Image from "next/image";

const Video = () => {
  return (
    <div className="relative overflow-hidden rounded-[1.3rem] w-full h-[45vw]  md:h-[20vw]">
      <div className=" absolute top-0 left-0 w-full flex">
        {/* <Image className=" object-cover flex" height={400} width={700} alt="thumbnail" src={"https://i.ytimg.com/vi/uuZE_IRwLNI/maxresdefault.jpg"}></Image> */}
        <img className="h-full w-full flex" src="/images/cuppy.jpg"></img>
      </div>
      <div className=" absolute top-0 left-0 bg-[rgba(10,31,68,0.4)]  w-full grid place-items-center h-full place-content-center">
        <button className=" mb-3 p-[1.1rem] grid place-items-center rounded-[1.3rem] text-white bg-[rgba(255,255,255,0.3)]">
          <span className="icon-play text-[1.8rem]"></span>
        </button>
        <p className="body_heavy text-white">Play welcome video ⚡️</p>
      </div>
      <video className="absolute top-0 left-0 h-full w-full" autoPlay src="https://www.youtube.com/watch?v=uuZE_IRwLNI"></video>
    </div>
  );
};

export default Video;
