import React from "react";
import BaseLayout from "../Layouts/Layout";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const GiftGoalSkeleton = () => {
  return (
    <div className="py-[1.6rem] px-[1.6rem]">
      <Stack spacing={3}>
        <Skeleton animation="wave" variant="rectangular" width="100%" height={400} />
        <Skeleton animation="wave" variant="rectangular" width="100%" height={150} />
      </Stack>
    </div>
  );
};

export default GiftGoalSkeleton;
