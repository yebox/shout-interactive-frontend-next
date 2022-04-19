import React, { useEffect, useRef, useState } from "react";
import UploadIndicator from "./Upload-Indicator";

const Upload = ({ withLabel = true }) => {
  const [file, setFile] = useState(null);
  const [vidSrc, setvidSrc] = useState(null);
  const canvasRef = useRef(null);
  const vidRef = useRef(null);

  function getVideoCover(file, seekTo = 0.0) {
    console.log("getting video cover for file: ", file);
    return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = vidRef.current;
      videoPlayer.setAttribute("src", URL.createObjectURL(file));
      videoPlayer.load();
      videoPlayer.addEventListener("error", (ex) => {
        reject("error when loading video file", ex);
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener("loadedmetadata", () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          reject("video is too short.");
          return;
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener("seeked", () => {
          console.log("video is now paused at %ss.", seekTo);
          // define a canvas to have the same dimension as the video
          const canvas = canvasRef.current;
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;
          // draw the video frame to canvas
          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          // return the canvas image as a blob
          ctx.canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.75 /* quality */
          );
        });
      });
    });
  }

  const onSelectFilesChange = async (e) => {
    console.log("files are", e.target.files);
    setFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
    console.log(src);
    setvidSrc(src);

    // try {
    //   // get the frame at 1.5 seconds of the video file
    //   const cover = await getVideoCover(e.target.files[0], 1.5);
    //   // print out the result image blob
    //   console.log(cover);
    // } catch (ex) {
    //   console.log("ERROR: ", ex);
    // }
    // canvasRef.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // URL.revokeObjectURL(src);
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(vidSrc);
    };
  }, []);

  return (
    <>
      {withLabel && <p className="caption_heavy text-black-default mb-3 mt-[1.6rem]">Video Invitation</p>}
      <div className=" min-w-[220px] h-[150px] rounded-[4px] border-black-lighter outline-dashed border-opacity-10 outline-[1px] bg-black-lightest-1 flex flex-col items-center justify-center">
        <span className="icon-Vector text-[32px] mb-1"></span>
        <input accept="video/*" onChange={onSelectFilesChange} id={"file"} className=" invisible" type={"file"}></input>
        <p className=" text-black-default caption_heavy text-center">
          <label className="caption_heavy text-primary cursor-pointer block" htmlFor="file">
            Record or upload a video
          </label>
          message to your guests
        </p>
      </div>
      {file && (
        <UploadIndicator
          action={() => {
            setFile(null);
          }}
          fileName={file?.name}
        >
          <video className=" bg-cover object-cover " style={{ width: "100%", height: "100%", objectPosition: "center -10px" }} ref={vidRef} controls src={vidSrc}></video>
        </UploadIndicator>
      )}
      {/* <img src={vidSrc}></img> */}
      {/* <canvas ref={canvasRef}></canvas> */}
    </>
  );
};

export default Upload;
