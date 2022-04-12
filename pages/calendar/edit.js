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
import MySelect from "../../components/FormElements/Select";
import BtnOutlined from "../../components/Buttons/BtnOutlined";

const Edit = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <BaseLayout>
      <HeadersV1 link={"/calendar"} text={"Edit calendar event"}>
        {/* <div className="icon-cancel rotate-45 text-black-default text-[1.6rem] "></div> */}
        <div></div>
      </HeadersV1>
      <Container>
        <Text label="Event name*" placeholder="David’s 25th Birthday"></Text>
        <MySelect label={"Event type*"}></MySelect>
        <MySelect label={"Repeat*"}></MySelect>
        <Calendar label={"Date*"}></Calendar>

        <TextArea label="Description" placeholder="Come and have a blast and party with me as I turn 25! 🍾"></TextArea>
        <div className="pb-[14.8rem]"></div>
      </Container>
      <FixedBottom>
        <div className="flex items-center gap-[1.6rem]">
          <BtnOutlined variant="outlined" text={"Cancel"} link="/ca"></BtnOutlined>
          <BtnPrimary text={"Update"} link="/calendar/edit"></BtnPrimary>
        </div>
      </FixedBottom>
    </BaseLayout>
  );
};

export default Edit;
