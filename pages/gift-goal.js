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

const GiftGoal = () => {
  const [contributors, setContributors] = useState([
    { name: "David Adeleke", amount: "5000" },
    { name: "Ada Lovace", amount: "1000" },
  ]);
  return (
    <>
      <BaseLayout>
        <HeadersV1 link={"/parties/id"} text={"Gift goal"}>
          <div></div>
        </HeadersV1>

        {/* Image-Picture */}
        <section className="mt-[1.6rem] mb-[10rem]">
          <Container>
            <div className="border rounded-[1.3rem] p-[1.6rem] mb-7 ">
              <Image width={700} height={416.2} src="/images/dubai-img.jpg" alt="place-img"></Image>
              <h3 className="title_heavy text-black-default mt-[1.6rem]">2 Week Trip to Dubai</h3>
              <p className="mb-[1.6rem] caption_light ">A 2 week all expense paid trip to dubai brought to you by Emirates Airline.</p>
              <ProgressBar value={30}></ProgressBar>
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
              <Text label="coins"></Text>
            </form>
          </Container>
        </section>
        <FixedBtn text={"Send coins"} link="/gift-goal"></FixedBtn>
      </BaseLayout>
    </>
  );
};

export default GiftGoal;
