import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { createCalendar, getCalendarCreatedStatus, getCalendarError, getCreateCalendarError, getCreatingCalendarStatus, setCalendarCreated } from "../../store/calendar";
import { getAuthStatus, getUser } from "../../store/user";
import Protect from "../../components/Protect";
import Notification from "../../components/Notification";
import { useRouter } from "next/router";

const New = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(getUser);
  const creatingCalendar = useSelector(getCreatingCalendarStatus);
  const createCalendarError = useSelector(getCreateCalendarError);
  const calendarCreated = useSelector(getCalendarCreatedStatus);
  const authenticated = useSelector(getAuthStatus);
  const [calendarData, setCalendarData] = useState({
    name: "",
    event_type: "birthday",
    repeat: "yearly",
    date: "",
    party: "1234",
    description: "",
  });
  const [notifOpen, setNotifOpen] = useState(false);

  // Form Error
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const isCalendarInfoValid = () => {
    console.log(calendarData.name);
    if (!calendarData.name || !calendarData.date || !calendarData.description) {
      return false;
    } else {
      return true;
    }
  };

  const onCreate = () => {
    console.log("on create");
    console.log("user is ", user);
    if (!isCalendarInfoValid()) {
      console.log(" party not valide");
      if (!calendarData.name) setNameError(true);
      if (!calendarData.date) setDateError(true);
      if (!calendarData.description) setDescError(true);
      return;
    }
    setProcessing(true);
    dispatch(createCalendar(calendarData));
  };

  useEffect(() => {
    if (authenticated) {
      console.log("user is ", user.user);
      setCalendarData((val) => ({ ...val, user: user?.user?.id }));
    }
  }, [authenticated]);

  useEffect(() => {
    if (!creatingCalendar && createCalendarError) {
      console.log("craet calendar error useeffect");
      setNotifOpen(true);
      setProcessing(false);
      setTimeout(() => {
        setNotifOpen(false);
      }, 5000);
    }
    if (!creatingCalendar && !createCalendarError && calendarCreated) {
      console.log("After creating party.. in use effect");
      router.push("/calendar?message=Calendar created successfully");
      // Reset creat party state
      dispatch(setCalendarCreated(false));
    }
    // console.log("statuses", creatingCalendar, createCalendarError);
  }, [creatingCalendar, createCalendarError, calendarCreated]);

  return (
    <Protect>
      <Notification open={notifOpen} icon={<i className="icon-info-circle text-[1.6rem]"></i>} title={"Create Calendar Error"} message="Error creating calendar!!" color="red"></Notification>

      <BaseLayout>
        <HeadersV1 link={"/calendar"} text={"Add calendar event"}>
          {/* <div className="icon-cancel rotate-45 text-black-default text-[1.6rem] "></div> */}
          <div></div>
        </HeadersV1>
        <Container>
          {/* Party Name */}
          <Text
            onChange={(e) => {
              if (!e.target.value) {
                setNameError(true);
              } else {
                setCalendarData((val) => ({ ...val, name: e.target.value }));
                setNameError(false);
              }
            }}
            status={nameError ? "error" : ""}
            message={nameError ? "This field is required" : ""}
            label="Party name*"
            placeholder="David’s 25th Birthday Bash 🎊🍾"
          ></Text>
          <MySelect
            handleChange={(e) => {
              setCalendarData((val) => ({ ...val, event_type: e.target.value }));
            }}
            items={["Birthday", "Wedding", "Others"]}
            label={"Event type*"}
          ></MySelect>
          <MySelect
            handleChange={(e) => {
              setCalendarData((val) => ({ ...val, repeat: e.target.value }));
            }}
            items={["Yearly", "Monthly"]}
            label={"Repeat*"}
          ></MySelect>

          <Calendar
            required={true}
            errorStatus={dateError}
            onChange={(newValue) => {
              if (newValue?.toString().includes("Invalid")) {
                setDateError(true);
              } else {
                setDateError(false);
                setCalendarData((val) => ({ ...val, date: newValue }));
              }
            }}
            label={"Date*"}
          ></Calendar>

          <TextArea
            onChange={(e) => {
              if (!e.target.value) {
                setDescError(true);
              } else {
                setDescError(false);
                setCalendarData((val) => ({ ...val, description: e.target.value }));
              }
            }}
            status={descError ? "error" : ""}
            message={descError ? "This field is required" : ""}
            label="Description"
            placeholder="Come and have a blast and party with me as I turn 25! 🍾"
          ></TextArea>
          <div className="pb-[14.8rem]"></div>
        </Container>
        <FixedBottom>
          <BtnPrimary
            loading={processing}
            disabled={processing ? true : false}
            handleClick={() => {
              onCreate();
            }}
            text={"Save"}
            link="/calendar/new"
          ></BtnPrimary>
        </FixedBottom>
      </BaseLayout>
    </Protect>
  );
};

export default New;
