import { Avatar } from "@mui/material";
import React from "react";

const MyAvatar = ({ src = "/broken-image.jpg", alt, width = "40px", height = "40px" }) => {
  return (
    <div className="relative">
      <Avatar sx={{ borderRadius: "10px", width: width, height: height }} alt={alt} src={src} />
    </div>
  );
};

export default MyAvatar;
