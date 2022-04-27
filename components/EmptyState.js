import React from "react";
import Image from "next/image";

const EmptyState = ({ image = "/images/musical-notes.png", caption = "Empty state", text = "No state yet" }) => {
  return (
    <div className="grid place-content-center place-items-center mt-[9.2rem] relative">
      <Image width={88} height={88} alt="musical-notes" src={image}></Image>
      <h2 className="headline_heavy text-black-default mb-[.8rem] mt-[3.2rem]">{caption}</h2>
      <p className="body_light mb-[4.8rem]">{text}</p>
    </div>
  );
};

export default EmptyState;
