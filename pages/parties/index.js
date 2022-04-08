import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BaseLayout from "../../components/Layouts/Layout";
import TabCard from "../../components/Parties/Tab-Card";
import FixedBtnLayout from "../../components/Layouts/FixedBtnLayout";
import Container from "../../components/Layouts/Container";
import Link from "next/link";

const Parties = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <FixedBtnLayout text={"Create Party"} btnColor={"#3CC13B"}>
        <header className="flex items-center justify-between px-[1.4rem] py-[1.2rem] border-b flex-shrink-0 flex-grow-0">
          <Link href={"/"}>
            <i className="icon-chevron-left-primary text-primary text-[1.8rem] cursor-pointer"></i>
          </Link>
          <span className="subheader_heavy">🎉 Shout! Party</span>
          <img src="/images/calendar-header.svg"></img>
        </header>
        <div className=" shrink-0 flex-grow-0">
          <Tabs sx={{ "justify-content": "space-between" }} value={value} onChange={handleChange} centered>
            <Tab label="My invites" />
            <Tab label="My parties" />
          </Tabs>
        </div>
        <div className=" overflow-scroll scroll_hide pb-[8rem] pt-[1.4rem]">
          <Container>
            <div>
              <h2 className="subheader_heavy mb-[.8rem]">Featured Parties</h2>
              <TabCard color={"#3CC13B"} text="Shout general party" link="/parties/id"></TabCard>
            </div>

            {/* Upcoming Parties */}
            <div className="mt-[1.8rem]">
              <h2 className="subheader_heavy mb-[.8rem]">Upcoming Parties</h2>
              <TabCard color={"#110066"} text="David Asiegbunam’s Birthday 🎉 " btnColor={"#3CC13B"} link="/parties/id"></TabCard>
            </div>
          </Container>
        </div>
      </FixedBtnLayout>
    </>
  );
};

export default Parties;
