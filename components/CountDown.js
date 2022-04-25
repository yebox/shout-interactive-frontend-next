import Countdown from "react-countdown";

const renderer = (element) => {
  return function render({ hours, minutes, seconds, completed, days }) {
    if (completed) {
      return <p> {element}</p>;
    } else {
      // Render a countdown
      return (
        <div className="caption_heavy text-white text-center flex items-center bg-[rgba(255,255,255,0.3)] rounded-xl px-[.8rem] py-[.4rem] ">
          {/* <p className="f font-semibold text-[#FCAC0D] text-[.9rem] leading-[1rem] mb-[4px]">Event starts in</p> */}
          <span className="caption_heavy text-white mr-2">Party starts in</span>
          <div className="flex">
            {/* <p className="flex flex-col items-center">
              <span className=" caption_heavy text-white">{days}</span>
              <span className="text-[7px] font-semibold">Days</span>
            </p> */}
            {/* <span className="mx-[1px]">:</span> */}

            <p className="flex items-center">
              <span className="">{hours}</span>
              <span className="caption_heavy text-white">H</span>
            </p>
            <span className="mx-[1px]">:</span>
            <p className="flex  items-center">
              <span className="">{minutes}</span>
              <span className="caption_heavy text-white">M</span>
            </p>
            <span className="mx-[1px]">:</span>
            <p className="flex  items-center">
              <span className="">{seconds}</span>
              <span className="caption_heavy text-white">S</span>
            </p>
          </div>
        </div>
      );
    }
  };
};
// const renderer =

const CountDown = ({ time = Date.now() + 500000, completed = "Ended" }) => {
  return <Countdown date={time} renderer={renderer(completed)}></Countdown>;
};

export default CountDown;
