import React from "react";

const Upload = ({ withLabel = true }) => {
  return (
    <>
      {withLabel && <p className="caption_heavy text-black-default mb-3 mt-[1.6rem]">Video Invitation</p>}
      <div className=" min-w-[220px] h-[150px] rounded-[4px] border-black-lighter outline-dashed border-opacity-10 outline-[1px] bg-black-lightest-1 flex flex-col items-center justify-center">
        <span className="icon-Vector text-[32px] mb-1"></span>
        <input id={"file"} className=" invisible" type={"file"}></input>
        <p className=" text-black-default caption_heavy text-center">
          <label className="caption_heavy text-primary cursor-pointer block" htmlFor="file">
            Record or upload a video
          </label>
          message to your guests
        </p>
      </div>
    </>
  );
};

export default Upload;
