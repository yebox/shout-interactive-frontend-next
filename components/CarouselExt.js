import React, { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as CarouselImage, Dot } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import { baseInstance } from "../axios";

const CarouselSlider = ({ data }) => {
  // const [images, setImages] = useState(["cuppy.jpg", "jack-harlow.jpg", "lil-nas.jpg", "nfl.webp", "burna.jpg", "drake.jpg"]);
  const [images, setImages] = useState(["cuppy.jpg", "burna.jpg", "jack-harlow.jpg", "lil-nas.jpg", "nfl.webp"]);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [intervalRef, setIntervalRef] = useState(null);
  const [play, setPlay] = useState(true);
  const [ads, setAds] = useState([]);

  const onNext = () => {
    setPlay(true);
    console.log("onNext, setActive is", active);
    if (active < images.length - 1) {
      setActive((val) => val + 1);
    } else {
      setActive(0);
    }
    // Works to
    // if (active == images.length - 1) {
    //   setActive(0);
    // }
  };
  // const onPrev = () => {
  //   setPlay(true);
  //   if (active > 0) {
  //     setActive((val) => val - 1);
  //   } else {
  //     setActive(images.length - 1);
  //   }
  // };
  const clearIntervalFunc = () => {
    setPlay(true);
    if (intervalRef) {
      console.log("clear interval", intervalRef);
      clearInterval(intervalRef);
    }
  };

  useEffect(() => {
    if (loaded) {
      const refTimer = setInterval(() => {
        // console.log("In imtervel", active);
        onNext();
      }, 3500);
      setIntervalRef(refTimer);
    } else {
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    if (active == images.length) {
      // console.log("active is last");
      setActive(0);
    }
  }, [active]);

  // useEffect(() => {
  //   console.log("Adds is in carousel is", data);
  // }, [data]);

  useEffect(() => {
    const getAds = async () => {
      try {
        const resp = await baseInstance.post("/ads/get-ads/");
        console.log("resp ads is...", resp.data.data);
      } catch (error) {
        if (error.response) {
          console.log("An error has occured", error.response);
        }
      }
    };

    getAds();
  }, []);
  return (
    <CarouselProvider isPlaying={play} interval={3500} infinite={true} className="relative" naturalSlideWidth={100} naturalSlideHeight={60} totalSlides={images.length}>
      {/* <div className="relative"> */}
      <div className="rounded-[13px] overflow-hidden relative shadow-sm">
        <Slider>
          {images.map((img, i) => {
            return (
              <Slide key={i} className="bg-red-400 " index={i}>
                {/* I am the first Slide. */}
                <CarouselImage className=" object-cover object-top" src={`/images/${img}`} />
              </Slide>
            );
          })}
        </Slider>
        {/* Dot Navigation */}

        <div className="flex items-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
          {images.map((img, i) => {
            return (
              <Dot key={i} slide={i}>
                <button
                  onClick={() => {
                    console.log("clearing interval", intervalRef);
                    clearIntervalFunc();
                    setActive(i);
                  }}
                  className={` h-[0.7rem] w-[0.7rem] rounded-full bg-white opacity-70 flex`}
                ></button>
                {/* <button
                  onClick={() => {
                    console.log("clearing interval", intervalRef);
                    clearIntervalFunc();
                    setActive(i);
                  }}
                  className={` h-2 w-2 rounded-full bg-white ${active == i ? " opacity-100 scale-[1.2]" : "opacity-50 scale-100"} flex`}
                ></button> */}
              </Dot>
            );
          })}
        </div>
      </div>

      {/* Buttton Navigation */}
      <ButtonBack
        onClick={() => {
          if (intervalRef) {
            console.log("clear interval", intervalRef);
            clearInterval(intervalRef);
          }
          // onPrev();
        }}
      >
        <button className=" h-[2.6rem] w-[2.6rem] -translate-y-1/2 absolute top-1/2 left-3 grid place-items-center bg-white opacity-80 focus:opacity-95 rounded-full">
          <Image height={10} width={10} src="/images/chevron-left-primary.svg" alt="arrow-left"></Image>
        </button>
      </ButtonBack>
      <ButtonNext
        onClick={() => {
          if (intervalRef) {
            console.log("clear interval", intervalRef);
            clearInterval(intervalRef);
          }
          // onNext();
        }}
      >
        <button className=" h-[2.6rem] w-[2.6rem] -translate-y-1/2 absolute top-1/2 right-3 rotate-180 grid place-items-center bg-white  opacity-80 focus:opacity-95 rounded-full">
          <Image height={10} width={10} src="/images/chevron-left-primary.svg" alt="arrow-left"></Image>
        </button>
      </ButtonNext>

      {/* </div> */}
    </CarouselProvider>
  );
};

export default CarouselSlider;
