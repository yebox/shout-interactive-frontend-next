import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const UploadIndicator = ({ fileName, children, action = () => {}, loadPercentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full mt-4">
      {/* <p className="caption_heavy text-black-default mb-3">Uploaded</p> */}
      {/* <LinearProgress variant="determinate" value={progress} /> */}

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="h-[200px] w-full rounded-[4px] border-black-lighter outline-dashed border-opacity-10 outline-[1px] bg-black-lightest-1 relative p-2">
            {/* Upload indicator */}
            <div className="absolute top-0 left-0 w-full h-full bg-green-400 z-0 " style={{ width: `${loadPercentage}%` }}></div>
            <div className="w-full h-full relative z-10">{children}</div>
            <span onClick={action} className="icon-close text-gray-default text-[10px] rounded-full p-2 bg-white absolute top-1 right-1 cursor-pointer z-20"></span>
          </div>
          <span className="caption_heavy block text-black-default mt-2 max-w-[25rem] text-ellipsis overflow-hidden whitespace-nowrap">{fileName}</span>
        </div>
      </div>
    </div>
  );
};

export default UploadIndicator;
