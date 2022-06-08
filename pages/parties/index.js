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

import {
  getPartiesLoadedStatus,
  loadAllParties,
  getShoutParties,
  getIndividualParties,
  getIsPartiesLoadingStatus,
  getInvitesLoadedStatus,
  getIsInvitesLoadingStatus,
  loadAllInvites,
  getInvitesParties,
} from "../../store/party";
import useLocalStorage from "../../hooks/useLocalStorage";
import PartiesSkeleton from "../../components/Skeleton/Parties";
import Notification from "../../components/Notification";
import ShoutParties from "../../components/Parties/ShoutParties";
import Protect from "../../components/Protect";
import EmptyState from "../../components/EmptyState";

const Parties = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoadin] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { getData } = useLoadData();
  const user = useSelector(getUser);
  const authenticated = useSelector(getAuthStatus);
  const router = useRouter();
  const dispatch = useDispatch();
  const allPartyLoaded = useSelector(getPartiesLoadedStatus);
  const isPartiesLoading = useSelector(getIsPartiesLoadingStatus);
  const invitesLoaded = useSelector(getInvitesLoadedStatus);
  const isInvitesLoading = useSelector(getIsInvitesLoadingStatus);
  const invitesParties = useSelector(getInvitesParties);
  const shoutParties = useSelector(getShoutParties);
  const individualParties = useSelector(getIndividualParties);
  const { getLocalStorage } = useLocalStorage();

  const handleChange = (event, newValue) => {
    console.log("New Value is ", newValue);
    setActiveTab(newValue);
  };

  const calcDate = (date) => {};

  useEffect(() => {
    if (router.query.message) {
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
        router.replace("/parties", undefined, { shallow: true });
      }, 10000);
    }
  }, [router.query]);

  useEffect(() => {
    if (authenticated && !allPartyLoaded) {
      console.log("authenticated and all party not loaded");
      dispatch(loadAllParties(user.user.id));
    }
    if (authenticated && !invitesLoaded) {
      console.log("authenticated and all invites not loaded");
      dispatch(loadAllInvites(user.user.id));
    }
  }, []);

  useEffect(() => {
    if (authenticated && !allPartyLoaded) {
      console.log("execuring auh load paty");
      dispatch(loadAllParties(user.user.id));
    }
    if (authenticated && !invitesLoaded) {
      console.log("authenticated and all invites not loaded");
      dispatch(loadAllInvites(user.user.id));
    }
    // console.log("ALl loaded paaraty is ", allPartyLoaded);
  }, [authenticated]);

  useEffect(() => {
    console.log("All parties loaded", allPartyLoaded);
    console.log("Shout Parties", shoutParties);
    console.log("Individual Parties", individualParties);
    // console.log("Invites88gskdjkskdg;ksd Parties", invitesParties);
  }, [allPartyLoaded]);

  return (
    <>
      <Protect>
        <Notification open={notifOpen} icon={<i className="icon-info-circle text-[1.6rem]"></i>} title={"Party Created"} message="Party Created successfully!" color="green"></Notification>

        <BaseLayout text={"Create Party"} btnColor={"#3CC13B"}>
          <HeadersV1 mb={false} link={`/?token=${user?.token}`} text={"🎉 Shout! Party"}>
            <Link href={"/calendar"}>
              <img src="/images/calendar-header.svg"></img>
            </Link>
          </HeadersV1>

          <div className=" shrink-0 flex-grow-0 sticky top-[4.9rem] bg-white z-40">
            <Tabs sx={{ "justify-content": "space-between" }} value={activeTab} onChange={handleChange} centered>
              <Tab label="My parties" />
              <Tab label="My invites" />
            </Tabs>
          </div>

          {isPartiesLoading && !activeTab && (shoutParties?.length == 0 || individualParties?.length == 0) && <PartiesSkeleton></PartiesSkeleton>}
          {!isPartiesLoading && !allPartyLoaded && <p>Problem loading parties</p>}
          {!isPartiesLoading && allPartyLoaded && shoutParties.length == 0 && individualParties.length == 0 && activeTab == 1 ? <p>No Parties</p> : ""}

          {isInvitesLoading && activeTab == 1 ? <PartiesSkeleton></PartiesSkeleton> : ""}
          {!isInvitesLoading && !invitesLoaded && activeTab == 1 ? <p>Problem loading Invites</p> : ""}
          {!isInvitesLoading && invitesLoaded && invitesParties.length == 0 && activeTab == 1 ? (
            // Empty Invites
            <Container>
              <EmptyState text="You have no invitations yet!" caption="No invites"></EmptyState>
            </Container>
          ) : (
            ""
          )}

          {/* All Parties Tab */}
          {allPartyLoaded && (shoutParties.length > 0 || individualParties.length > 0) && activeTab == 0 ? (
            <div className=" overflow-scroll scroll_hide pb-[8rem] pt-[1.4rem]">
              <Container>
                {/* Shout Party */}
                {shoutParties.length > 0 && <ShoutParties shoutParties={shoutParties}></ShoutParties>}

                {/* Upcoming Parties */}
                <div className="mt-[1.8rem]">
                  <h2 className="subheader_heavy mb-[.8rem]">Upcoming Parties</h2>
                  {individualParties.map((party, i) => {
                    return (
                      <div className="mb-[2.2rem]" key={i}>
                        <TabCard date={new Date(party?.date)} key={i} color={"#110066"} text={party.name} btnColor={"#3CC13B"} link={`/parties/${party.id}?type=individual`}></TabCard>{" "}
                      </div>
                    );
                  })}
                  {individualParties.length == 0 && "No party yet. Create one!"}
                </div>
              </Container>
            </div>
          ) : (
            ""
          )}
          {/* All Invites Tab */}
          {invitesLoaded && invitesParties.length > 0 && activeTab == 1 ? (
            <div className=" overflow-scroll scroll_hide pb-[8rem] pt-[1.4rem]">
              <Container>
                <div>
                  <h2 className="subheader_heavy mb-[.8rem]">Featured Parties</h2>
                  {invitesParties.map((party, i) => {
                    return (
                      <div className="mb-[2.2rem]" key={i}>
                        <TabCard date={new Date(party?.date)} color={"#FA9330"} text={party.name} link={`/parties/${party.id}?type=invite`}></TabCard>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </div>
          ) : (
            ""
          )}

          <FixedBottom>
            <BtnPrimary text={"Create"} color={"#14B363"} link="/parties/new"></BtnPrimary>
          </FixedBottom>
        </BaseLayout>
      </Protect>
    </>
  );
};

export default Parties;
