import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BaseLayout from "../../components/Layouts/Layout";
import TabCard from "../../components/Parties/Tab-Card";
import FixedBtnLayout from "../../components/Layouts/FixedBtnLayout";
import Container from "../../components/Layouts/Container";
import Link from "next/link";
import HeadersV1 from "../../components/Headers/Headers-v1";
import BtnPrimary from "../../components/Buttons/BtnPrimary";
import FixedBottom from "../../components/Layouts/FixedBottom";
import useLoadData from "../../hooks/useLoadData";
import { baseInstance } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getAuthStatus, getUser } from "../../store/user";
import { useRouter } from "next/router";
import { getPartiesLoadedStatus, loadAllParties, getShoutParties, getIndividualParties } from "../../store/party";
import useLocalStorage from "../../hooks/useLocalStorage";

const Parties = () => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoadin] = useState(false);
  const { getData } = useLoadData();
  const user = useSelector(getUser);
  const authenticated = useSelector(getAuthStatus);
  const router = useRouter();
  const dispatch = useDispatch();
  const allPartyLoaded = useSelector(getPartiesLoadedStatus);
  const shoutParties = useSelector(getShoutParties);
  const individualParties = useSelector(getIndividualParties);
  const { getLocalStorage } = useLocalStorage();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const authToken = getLocalStorage("shout-token");
    if (!authenticated && authToken) {
      dispatch(fetchUser(authToken));
    }
    if (!authenticated && !authToken) {
      router.replace("/");
    }
    if (authenticated && !allPartyLoaded) {
      console.log("authenticated and all party not loaded");
      dispatch(loadAllParties(user.user.id));
    }
  }, []);

  useEffect(() => {
    if (authenticated && !allPartyLoaded) {
      console.log("execuring auh load paty");
      dispatch(loadAllParties(user.user.id));
    }
    // console.log("ALl loaded paaraty is ", allPartyLoaded);
  }, [authenticated]);

  useEffect(() => {
    console.log("All parties loaded", allPartyLoaded);
    console.log("Shout Parties", shoutParties);
    console.log("Individual Parties", individualParties);
  }, [allPartyLoaded]);

  return (
    <>
      <BaseLayout text={"Create Party"} btnColor={"#3CC13B"}>
        <HeadersV1 mb={false} link={"/"} text={"🎉 Shout! Party"}>
          <Link href={"/calendar"}>
            <img src="/images/calendar-header.svg"></img>
          </Link>
        </HeadersV1>

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

        <FixedBottom>
          <BtnPrimary text={"Create"} color={"#14B363"} link="/parties/new"></BtnPrimary>
        </FixedBottom>
      </BaseLayout>
    </>
  );
};

export default Parties;
