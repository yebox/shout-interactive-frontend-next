import React from "react";
import BtnPrimary from "../../components/Buttons/BtnPrimary";
import Calendar from "../../components/FormElements/Calendar";
import TextArea from "../../components/FormElements/TextArea";
import Text from "../../components/FormElements/TextField";
import HeadersV1 from "../../components/Headers/Headers-v1";
import Container from "../../components/Layouts/Container";
import FixedBottom from "../../components/Layouts/FixedBottom";
import BaseLayout from "../../components/Layouts/Layout";
import Upload from "../../components/Upload/Upload";
import Chip from "@mui/material/Chip";
import MyAvatar from "../../components/Avatar";

const New = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <BaseLayout>
      <HeadersV1 link={"/parties"} text={"New shout! party"}>
        <div></div>
      </HeadersV1>
      <Container>
        <Text label="Party name*" placeholder="David’s 25th Birthday Bash 🎊🍾"></Text>
        <div className="">
          <label className="caption_heavy text-black-default flex mb-[8px] mt-[1.6rem]">Guests</label>
          <div
            className={`flex items-center relative h-[48px] mb-[10px] max-w-full min-w-[200px] w-full text-black-default body_light focus:border-primary focus:outline-0 border rounded-[16px] px-[8px] py-[14px]`}
          >
            <Chip sx={{ paddingLeft: "8px" }} avatar={<MyAvatar height="24px" width="24px"></MyAvatar>} label="Clickable Deletable" variant="outlined" onClick={handleClick} onDelete={handleDelete} />
            <i className="icon-add-user absolute right-3 text-gray-dark font-[2.2rem] top-1/2 -translate-y-1/2 cursor-pointer"></i>
          </div>
        </div>
        <Calendar label={"Date*"}></Calendar>
        <Upload></Upload>
        <TextArea label="Description" placeholder="Come and have a blast and party with me as I turn 25! 🍾"></TextArea>
        <div className="pb-[14.8rem]"></div>
      </Container>
      <FixedBottom>
        <BtnPrimary text={"Create"} link="/parties/new"></BtnPrimary>
      </FixedBottom>
    </BaseLayout>
  );
};

export default New;
