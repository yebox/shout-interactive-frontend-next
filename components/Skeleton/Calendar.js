import React from "react";
import BaseLayout from "../Layouts/Layout";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const CalendarSkeleton = () => {
  return (
    <div className="py-[1.6rem] px-[1.6rem]">
      <Stack spacing={3}>
        <div className="flex ">
          <Skeleton width={200} height={35} variant="text" />
        </div>
        <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />
        <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />
        <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />
      </Stack>
    </div>
  );
};

export default CalendarSkeleton;
