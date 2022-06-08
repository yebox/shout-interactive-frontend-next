import React from "react";
import BaseLayout from "../Layouts/Layout";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const HomeSkeleton = () => {
  return (
    <div className="py-[1.6rem] px-[1.6rem]">
      <Stack spacing={3}>
        <div className="flex h-[4rem] ">
          <Skeleton width={100} variant="text" />
          <div className="ml-auto flex items-center gap-5 h-[4rem]">
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        </div>
        <Skeleton animation="wave" variant="rectangular" width="100%" height={230} />
        <Skeleton animation="wave" variant="rectangular" width="100%" height={150} />
        <Skeleton animation="wave" variant="rectangular" width="100%" height={150} />
      </Stack>
    </div>
  );
};

export default HomeSkeleton;
