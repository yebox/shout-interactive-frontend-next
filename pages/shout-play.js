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
        <HeadersV1 mb={false} link={`/?token=${user?.token}`} text={"Shout! Play 🎮"}>
          <div></div>
        </HeadersV1>
        <Container>
          <EmptyState caption="Shout Play" text="Play games and win big prizes everyday!🏀" />
        </Container>
      </BaseLayout>
    </Protect>
  );
};

export default ShoutPlay;
