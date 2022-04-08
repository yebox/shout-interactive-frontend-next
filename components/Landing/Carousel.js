import React, { useState } from "react";
import Image from "next/image";

const Carousel = () => {
  const images = ["cuppy.jpg"];
  const [active, setActive] = useState(1);

  const onNext = () => {};
  const onPrev = () => {};
  return (
    <div className="relative">
      {/* Images container */}
      <div className="flex h-max w-full overflow-hidden bg-red-400 rounded-[13px] ">
        {images.map((img, i) => {
          return <Image key={i} src={`/images/${img}`} className=" object-cover !w-full bg-top" height={400} width={700} alt="shout-party-images"></Image>;
        })}
      </div>

      {/* Dot Navigation */}
      <div className="flex items-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
        <button className=" h-3 w-3 rounded-full bg-white"></button>
        <button className=" h-3 w-3 rounded-full bg-white"></button>
        <button className=" h-3 w-3 rounded-full bg-white"></button>
      </div>

      {/* Buttons */}
      <button className=" h-[2.6rem] w-[2.6rem] -translate-y-1/2 absolute top-1/2 left-3 grid place-items-center bg-white rounded-full">
        <Image height={14} width={14} src="/images/chevron-left-primary.svg" alt="arrow-left"></Image>
      </button>
      <button className=" h-[2.6rem] w-[2.6rem] -translate-y-1/2 absolute top-1/2 right-3 rotate-180 grid place-items-center bg-white rounded-full">
        <Image height={14} width={14} src="/images/chevron-left-primary.svg" alt="arrow-left"></Image>
      </button>
    </div>
  );
};

export default Carousel;
