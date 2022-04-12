import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const UploadIndicator = ({ fileName }) => {
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
    <div>
      <p className="caption_heavy text-black-default mb-3">Uploaded</p>
      {/* <LinearProgress variant="determinate" value={progress} /> */}

      <div className="flex items-center gap-4">
        <div>
          <div className="h-[55px] w-[95px] rounded-[4px] border-black-lighter outline-dashed border-opacity-10 outline-[1px] bg-black-lightest-1 relative">
            <span className="icon-close text-gray-default text-[10px] rounded-full p-2 bg-white absolute top-1 right-1 cursor-pointer"></span>
          </div>
          <span className="caption_heavy text-gray-default mt-3">{fileName}</span>
        </div>
        <div>
          <div className="h-[55px] w-[95px] rounded-[4px] border-black-lighter outline-dashed border-opacity-10 outline-[1px] bg-black-lightest-1 relative">
            <span className="icon-close text-gray-default text-[10px] rounded-full p-2 bg-white absolute top-1 right-1 cursor-pointer"></span>
          </div>
          <span className="caption_heavy text-gray-default mt-3">{fileName}</span>
        </div>
      </div>
    </div>
  );
};

export default UploadIndicator;
