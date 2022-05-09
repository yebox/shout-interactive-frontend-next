import React from "react";
import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import HeadersV1 from "../components/Headers/Headers-v1";
import Container from "../components/Layouts/Container";
import BaseLayout from "../components/Layouts/Layout";
import Protect from "../components/Protect";
import { getUser } from "../store/user";

const ShoutPlay = () => {
  const user = useSelector(getUser);
  return (
    <Protect>
      <BaseLayout>
        {/* <HeadersV1 mb={false} link={`/?token=${user?.token}`} text={"Shout! Play "}> */}
        <HeadersV1 mb={false} link={`/?token=${user?.token}`} text={"Shout! Play 🎮"}>
          <div></div>
        </HeadersV1>
        <Container>
          <EmptyState caption="Shout! Play" text="Play, earn and cashout everyday!" />
          {/* <EmptyState imgClassName={" -translate-x-[85px]"} image="/images/shout-games.png" caption="Shout! Play" text="Play, earn and cashout everyday!" /> */}
        </Container>
      </BaseLayout>
    </Protect>
  );
};

export default ShoutPlay;
