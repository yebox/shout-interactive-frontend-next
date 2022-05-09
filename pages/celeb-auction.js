import React from "react";
import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import HeadersV1 from "../components/Headers/Headers-v1";
import Container from "../components/Layouts/Container";
import BaseLayout from "../components/Layouts/Layout";
import Protect from "../components/Protect";
import { getUser } from "../store/user";

const CelebAuction = () => {
  const user = useSelector(getUser);
  return (
    <Protect>
      <BaseLayout>
        <HeadersV1 mb={false} link={`/?token=${user?.token}`} text={"Celebrity Auction"}>
          {/* <HeadersV1 mb={false} link={`/?token=${user?.token}`} text={"Celebrity Auction 🎄"}> */}
          <div></div>
        </HeadersV1>
        <Container>
          <EmptyState image="/images/gift-box.png" caption="Celebrity Auction" text="Own a piece of your fav's prized possessions" />
        </Container>
      </BaseLayout>
    </Protect>
  );
};

export default CelebAuction;
