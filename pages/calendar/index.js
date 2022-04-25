import { Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import HeadersV1 from "../../components/Headers/Headers-v1";
import Container from "../../components/Layouts/Container";
import BaseLayout from "../../components/Layouts/Layout";
import Link from "next/link";
import Protect from "../../components/Protect";
import { useSelector } from "react-redux";
import { getCalendar, getCalendarError, getIsCalendarLoading } from "../../store/calendar";
import CalendarSkeleton from "../../components/Skeleton/Calendar";
import Notification from "../../components/Notification";
import { useRouter } from "next/router";

const CalendarCard = ({ color, text, icon }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        background: `${color == "#FA9330" ? "url(/images/bg-orange.png)" : "url(/images/bg-blue.png)"}`,
      }}
      className=" !bg-cover capitalize cursor-pointer hover:scale-[1.01] transition-all mb-[1.8rem] h-[5.6rem] rounded-[1.3rem] flex items-center justify-between p-[1.6rem] subheader_heavy !text-white"
    >
      {text}
      {icon}
    </div>
  );
};

const Calendar = () => {
  const [value, setValue] = useState(0);
  const calendarError = useSelector(getCalendarError);
  const isCalendarLoading = useSelector(getIsCalendarLoading);
  const allCalendar = useSelector(getCalendar);
  const [notifOpen, setNotifOpen] = useState(false);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (router.query.message) {
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
        router.replace("/calendar", undefined, { shallow: true });
      }, 7000);
    }
  }, [router.query]);

  return (
    <>
      <Protect>
        <Notification open={notifOpen} icon={<i className="icon-info-circle text-[1.6rem]"></i>} title={"Calendar Created"} message="Calendar Created successfully!" color="green"></Notification>

        <BaseLayout>
          <HeadersV1 mb={false} link={"/parties"} text={"Calendar"}>
            <Link href={"/calendar/new"}>
              <div className="icon-cancel rotate-45 text-black-default text-[1.6rem] "></div>
            </Link>
          </HeadersV1>
          {isCalendarLoading && !allCalendar && <CalendarSkeleton></CalendarSkeleton>}
          {allCalendar && !calendarError && (
            <>
              {/* Navigator Tabs */}
              {/* <Tabs sx={{ "justify-content": "space-between", marginBottom: "2.4rem" }} value={value} onChange={handleChange} centered>
                <Tab label="My Events" />
                <Tab label="Other Events" />
              </Tabs> */}
              <div className=" shrink-0 flex-grow-0 sticky top-[4.9rem] bg-white z-50">
                <Tabs sx={{ "justify-content": "space-between" }} value={value} onChange={handleChange} centered>
                  <Tab label="My Events" />
                  <Tab label="Other Events" />
                </Tabs>
              </div>
              {/* Main */}
              <Container>
                {/* <section>
                  <h3 className="mb-[.8rem] subheader_heavy text-black-default">Today</h3>
                  <CalendarCard color={"#FA9330"} text={"Tayo Longe’s Birthday"} icon={<i className="icon-add-user"></i>}></CalendarCard>
                </section> */}

                {/* Today Section */}
                <section className="mb-[3.2rem]">
                  <h3 className="mb-[.8rem] subheader_heavy text-black-default">Upcoming</h3>
                  {allCalendar.map((cal, i) => {
                    return (
                      <CalendarCard
                        key={i}
                        text={cal.name}
                        icon={
                          <>
                            {cal.event_type.includes("birth") && <i className="icon-cake"></i>}
                            {cal.event_type.includes("wed") && <i className="icon-love"></i>}
                            {!cal.event_type.includes("wed") && !cal.event_type.includes("birth") && <i className="icon-confeti"></i>}
                          </>
                        }
                      ></CalendarCard>
                    );
                  })}
                </section>

                {/* Today Section */}
                {/* Today Section */}
              </Container>
            </>
          )}
          {calendarError && !allCalendar && <p>An error has occured</p>}
        </BaseLayout>
      </Protect>
    </>
  );
};

export default Calendar;
