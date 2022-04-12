import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import HeadersV1 from "../../components/Headers/Headers-v1";
import Container from "../../components/Layouts/Container";
import BaseLayout from "../../components/Layouts/Layout";
import Link from "next/link";

const CalendarCard = ({ color, text, icon }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        background: `${color == "#FA9330" ? "url(/images/bg-orange.png)" : "url(/images/bg-blue.png)"}`,
      }}
      className=" cursor-pointer hover:scale-[1.01] transition-all mb-[1.8rem] h-[5.6rem] rounded-[1.3rem] flex items-center justify-between p-[1.6rem] subheader_heavy !text-white"
    >
      {text}
      {icon}
    </div>
  );
};

const Calendar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BaseLayout>
      <HeadersV1 mb={false} link={"/parties"} text={"Calendar"}>
        <Link href={"/calendar/new"}>
          <div className="icon-cancel rotate-45 text-black-default text-[1.6rem] "></div>
        </Link>
      </HeadersV1>

      {/* Navigator Tabs */}
      <Tabs sx={{ "justify-content": "space-between", marginBottom: "2.4rem" }} value={value} onChange={handleChange} centered>
        <Tab label="My Events" />
        <Tab label="Other Events" />
      </Tabs>
      {/* Main */}
      <Container>
        {/* Today Section */}
        <section className="mb-[3.2rem]">
          <h3 className="mb-[.8rem] subheader_heavy text-black-default">Today</h3>
          <CalendarCard color={"#FA9330"} text={"Mitch’s Birthday"} icon={<i className="icon-add-user"></i>}></CalendarCard>
        </section>
        <section>
          <h3 className="mb-[.8rem] subheader_heavy text-black-default">Tomorrow</h3>
          <CalendarCard text={"Tayo Longe’s Birthday"} icon={<i className="icon-add-user"></i>}></CalendarCard>
        </section>
        {/* Today Section */}
        {/* Today Section */}
      </Container>
    </BaseLayout>
  );
};

export default Calendar;
