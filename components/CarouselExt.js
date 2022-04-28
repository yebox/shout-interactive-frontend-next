import React, { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as CarouselImage, Dot } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";

const CarouselSlider = () => {
  const [images, setImages] = useState(["cuppy.jpg", "jack-harlow.jpg", "lil-nas.jpg", "nfl.webp", "drake.jpg"]);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [intervalRef, setIntervalRef] = useState(null);
  const onNext = () => {
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
  const onPrev = () => {
    if (active > 0) {
      setActive((val) => val - 1);
    } else {
      setActive(images.length - 1);
    }
  };
  const clearIntervalFunc = () => {
    if (intervalRef) {
      console.log("clear interval", intervalRef);
      clearInterval(intervalRef);
    }
  };

  useEffect(() => {
    if (loaded) {
      const refTimer = setInterval(() => {
        console.log("In imtervel", active);
        onNext();
      }, 5000);
      setIntervalRef(refTimer);
    } else {
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    if (active == images.length) {
      console.log("active is last");
      setActive(0);
    }
  }, [active]);
  return (
    <CarouselProvider isPlaying={true} infinite={true} className="relative" naturalSlideWidth={100} naturalSlideHeight={60} totalSlides={images.length}>
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

        {/* <div className="flex items-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
          {images.map((img, i) => {
            return (
              <Dot key={i} slide={i}>
                <button
                  onClick={() => {
                    console.log("clearing interval", intervalRef);
                    clearIntervalFunc();
                    setActive(i);
                  }}
                  className={` h-3 w-3 rounded-full bg-white ${active == i ? " opacity-100" : "opacity-50"} flex`}
                ></button>
              </Dot>
            );
          })}
        </div> */}
      </div>

      {/* Buttton Navigation */}
      <ButtonBack
        onClick={() => {
          if (intervalRef) {
            console.log("clear interval", intervalRef);
            clearInterval(intervalRef);
          }
          onPrev();
        }}
      >
        <button className=" h-[2.6rem] w-[2.6rem] -translate-y-1/2 absolute top-1/2 left-3 grid place-items-center bg-white rounded-full">
          <Image height={10} width={10} src="/images/chevron-left-primary.svg" alt="arrow-left"></Image>
        </button>
      </ButtonBack>
      <ButtonNext
        onClick={() => {
          if (intervalRef) {
            console.log("clear interval", intervalRef);
            clearInterval(intervalRef);
          }
          onNext();
        }}
      >
        <button className=" h-[2.6rem] w-[2.6rem] -translate-y-1/2 absolute top-1/2 right-3 rotate-180 grid place-items-center bg-white rounded-full">
          <Image height={10} width={10} src="/images/chevron-left-primary.svg" alt="arrow-left"></Image>
        </button>
      </ButtonNext>

      {/* </div> */}
    </CarouselProvider>
  );
};

export default CarouselSlider;
