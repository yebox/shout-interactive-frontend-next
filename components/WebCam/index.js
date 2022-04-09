import React, { useEffect, useRef, useState } from "react";
import styles from "./webcam.module.css";

const WebCam = ({ showVidW, showAud }) => {
  const vidRef = useRef(null);
  const [stream, setStream] = useState(null);
  // const [show, setShow] = useState(showVidW);

  const initVideo = async () => {
    const vid = vidRef.current;

    try {
      const constraints = {
        audio: false,
        video: true,
      };
      const vidstream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(vidstream);

      if ("srcObject" in vid) {
        vid.srcObject = vidstream;
      } else {
        vid.src = window.URL.createObjectURL(vidstream);
      }
    } catch (error) {
      console.log("An error has occured", error.name);
      alert(`An error has occured-${error.name}`);
    }
  };

  function stopVideoOnly(stream) {
    stream.getTracks().forEach(function (track) {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });
  }

  useEffect(() => {
    console.log("in use effect...");
    initVideo();
  }, []);

  // Toggle show vid
  useEffect(() => {
    console.log("in use effec webcam", showVidW);
    if (stream) stopVideoOnly(stream);
  }, [showVidW]);

  return <video autoPlay className={styles.video} ref={vidRef} id="video"></video>;
};

export default WebCam;
