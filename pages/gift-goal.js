import React, { useState } from "react";
import HeadersV1 from "../components/Headers/Headers-v1";
import Container from "../components/Layouts/Container";
import BaseLayout from "../components/Layouts/Layout";
import Image from "next/image";
import Label from "../components/FormElements/Label";
import Text from "../components/FormElements/TextField";
import FixedBtn from "../components/Buttons/FixedBtn";
import ProgressBar from "../components/ProgressBar";
import BoxContainer from "../components/BoxContainer";
import { Avatar } from "@mui/material";
import BtnPrimary from "../components/Buttons/BtnPrimary";
import Drawer from "../components/Drawer";
import MyAvatar from "../components/Avatar";

const GiftGoal = () => {
  const [contributors, setContributors] = useState([
    { name: "David Adeleke", amount: "5000" },
    { name: "Ada Lovace", amount: "1000" },
  ]);
  const [allGoals, setAllGoals] = useState([
    { name: "2 Week Trip to Dubai ", desc: "A 2 week all expense paid trip to dubai brought to you by Emirates Airline." },
    { name: "Mercedes G-Wagon 2021 ", desc: "Stand a chance to win a 2021 Mercedes G-Wagon. Courtesy of Mercedes Nigeria." },
    { name: "N10,000,000 Cash! ", desc: "Win 10 million naira in cash. Courtesy of Heritage Bank" },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedGiftGoal, setSelectedGiftGoal] = useState(null);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [selectedIsEmpty, setSelectedIsEmpty] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const toggleDrawer = (event) => {
    setBtnDisabled(true);
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpened((val) => !val);
  };

  const onSelectGiftGoal = (i) => {
    setSelectedGiftGoal(allGoals[i]);
  };

  return (
    <>
      <BaseLayout>
        <HeadersV1 link={"/parties/id"} text={"Gift goal"}>
          <div></div>
        </HeadersV1>

        {/* All Goals Drawer */}
        <Drawer
          open={isDrawerOpened}
          onClose={(e) => {
            toggleDrawer(e);
          }}
        >
          <h2 className="title_heavy mt-[2.4rem] text-black-default">Gifts</h2>
          <p className="caption_light mb-[1.6rem] text-black-default">Select a gift you would like to win</p>

          {/* All goals */}
          <div className="pb-[8.2rem] ">
            {allGoals.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    setActiveIndex(i);
                    setBtnDisabled(false);
                  }}
                  className="flex items-center mb-[1.8rem] last:mb-0  w-full rounded-[.8rem] border-transparent border border-gray-light hover:border-primary p-[.8rem] focus:outline-primary focus:outline-1 focus:outline"
                  key={i}
                >
                  <div className=" mr-[.8rem]">
                    <MyAvatar height="56px" width="56px" alt={e.name} src="/broken-image.jpg" />
                  </div>
                  <div className="flex flex-col self-start mr-auto">
                    <span className="body_heavy mb-[.2rem] text-black-default text-left">{e.name}</span>
                    <span className="caption_light text-left text-black-light">{e.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full p-[1.6rem]">
            <BtnPrimary
              handleClick={() => {
                toggleDrawer();
                onSelectGiftGoal(activeIndex);
              }}
              color="#14B363"
              disabled={btnDisabled}
              text={"Submit"}
            ></BtnPrimary>
          </div>
        </Drawer>

        {/* Empty State */}
        {!selectedGiftGoal && (
          <div className="grid place-content-center place-items-center mt-[9.2rem] relative">
            <Image width={88} height={88} alt="musical-notes" src={"/images/musical-notes.png"}></Image>
            <h2 className="headline_heavy text-black-default mb-[.8rem] mt-[3.2rem]">No gift goal</h2>
            <p className="body_light mb-[4.8rem]">You have not selected a gift goal</p>
            <BtnPrimary
              handleClick={() => {
                setIsDrawerOpened(true);
              }}
              text="Select Gift goal"
            ></BtnPrimary>
          </div>
        )}

        {/* Image-Picture */}
        {selectedGiftGoal && (
          <>
            <section className="mt-[1.6rem] mb-[10rem]">
              <Container>
                <div className="border rounded-[1.3rem] p-[1.6rem] mb-7 ">
                  <Image width={700} height={416.2} src="/images/dubai-img.jpg" alt="place-img"></Image>
                  <h3 className="title_heavy text-black-default mt-[1.6rem]">{selectedGiftGoal.name}</h3>
                  <p className="mb-[1.6rem] caption_light ">{selectedGiftGoal.desc}</p>
                  <ProgressBar color="#3CC13B" value={30}></ProgressBar>
                  <div className="mt-[.4rem]">
                    <span className="caption_heavy text-black-default">10,000/40,000 Coins</span>
                  </div>
                </div>
                {/* Contributors */}
                <BoxContainer>
                  <h3 className="subheader_heavy mb-[1.6rem]">Contributors</h3>
                  {contributors.map((e, i) => {
                    return (
                      <div key={i} className="flex items-center mb-[1.6rem]">
                        {/* <img className="h-[3.4rem] w-[3.4rem]" src="/"></img> */}
                        <Avatar sx={{ borderRadius: "10px" }} alt={e.name} src="/broken-image.jpg" />
                        <p className="ml-[1rem] caption_heavy text-[#90979E] max-w-[22.8rem]">
                          <span className="text-[#C0C9D2] mr-3">{e.name}</span>
                          <span>Sent you {e.amount} 🎉🎉</span>
                        </p>
                      </div>
                    );
                  })}
                </BoxContainer>
                <form className="mb-[3rem] mt-[1.6rem]">
                  <Text placeholder="Amount" label="Send coins"></Text>
                </form>
              </Container>
            </section>
            <FixedBtn text={"Send coins"} link="/gift-goal"></FixedBtn>
          </>
        )}
      </BaseLayout>
    </>
  );
};

export default GiftGoal;
