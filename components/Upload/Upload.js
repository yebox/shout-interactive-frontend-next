import React, { useEffect, useRef, useState } from "react";
import BtnPrimary from "../Buttons/BtnPrimary";
import UploadIndicator from "./Upload-Indicator";
import axios from "axios";
import Notification from "../Notification";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";

const Upload = ({ withLabel = true, onUploadFile, onUploadError = () => {} }) => {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [vidSrc, setvidSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const user = useSelector(getUser);

  const [uploadPercentage, setUploadPercentage] = useState(0);
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

  const onUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("type", "video");
    formData.append("ref", user.user.id);
    formData.append("dir", "/sif/uploads/party");
    console.log("in main uploading function, formdatra iss", file);

    setUploading(true);
    try {
      const res = await axios.post("https://filemgt.shoutng.com/v1/file/upload", formData, {
        // const res = await axios.post("http://a805df5bc8dc349ea81228a62f357233-654010950.eu-west-3.elb.amazonaws.com/v1/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
        },
      });

      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 10000);

      const { name, path } = res.data.data;
      console.log("file uploaded successfully", name, path);

      // setUploadedFile({ name, path });
      onUploadFile(res.data.data);
      setMessage("File Uploaded Successfully");
      setUploading(false);
      setErr(false);
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
      }, 10000);
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setMessage("There was a problem with the server");
        onUploadError("There was a problem with the server");
        console.log(err.response.data);
      } else {
        // setMessage(err.response.data);
        setMessage("An unknown error has occured. Pls try again later!");
        console.log("An error has occured", err.response);
        onUploadError("Problem Uploading file, pls try again later!");
      }
      setUploadPercentage(0);
      setMessage("Error Uploading File. Try again later");
      setUploading(false);
      setErr(true);
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
      }, 10000);
    }
  };

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
      <Notification open={notifOpen} icon={<i className="icon-info-circle text-[1.6rem]"></i>} title={"Video Upload"} message={message} color={`${err ? "red" : "green"}`}></Notification>

      {withLabel && <p className="caption_heavy text-black-default mb-3 mt-[1.6rem]">Video Invitation</p>}
      {!file && (
        <label
          htmlFor="file"
          className=" min-w-[220px] h-[150px] rounded-[4px] border-black-lighter outline-dashed border-opacity-10 outline-[1px] bg-black-lightest-1 flex flex-col items-center justify-center"
        >
          <span className="icon-Vector text-[32px] mb-1"></span>
          <input accept="video/*" onChange={onSelectFilesChange} id={"file"} className=" invisible" type={"file"}></input>
          <p className=" text-black-default caption_heavy text-center">
            <label className="caption_heavy text-primary cursor-pointer block">Record or upload a video</label>
            message to your guests
          </p>
        </label>
      )}
      {file && (
        <>
          <UploadIndicator
            loadPercentage={uploadPercentage}
            action={() => {
              setFile(null);
              setUploading(false);
            }}
            fileName={file?.name}
          >
            <video className=" bg-cover object-cover " style={{ width: "100%", height: "100%", objectPosition: "center -10px" }} ref={vidRef} controls src={vidSrc}></video>
          </UploadIndicator>
          <div className="mb-[2rem] mt-[1rem]">
            <BtnPrimary
              loading={uploading}
              handleClick={() => {
                console.log("uploading file");
                onUpload(file);
              }}
              text={uploading ? "Uploading..." : "Upload"}
              disabled={uploading}
            ></BtnPrimary>
          </div>
        </>
      )}
      {/* <img src={vidSrc}></img> */}
      {/* <canvas ref={canvasRef}></canvas> */}
    </>
  );
};

export default Upload;
