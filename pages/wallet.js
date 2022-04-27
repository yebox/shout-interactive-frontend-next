import React from "react";
import HeadersV1 from "../components/Headers/Headers-v1";
import BaseLayout from "../components/Layouts/Layout";
import Container from "../components/Layouts/Container";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser } from "../store/user";
import Protect from "../components/Protect";

const Wallet = () => {
  const coins = [
    { image: "coin.png", amount: "2000", price: "400" },
    { image: "coin-3.png", amount: "5,500", price: "5,500" },
    { image: "coin-5.png", amount: "12,000", price: "3,000" },
    { image: "coin-treasure.png", amount: "20,000", price: "10,000" },
    { image: "coin-safe.png", amount: "27,000 ", price: "20,000" },
  ];
  const user = useSelector(getUser);

  const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) =>
    parseInt(num, 10)
      .toString()
      .replace(/[^0-9]/g, "");

  return (
    <Protect>
      <BaseLayout>
        {/* Header */}
        <section className="bg-[#FA9330]  bg-[url(/images/bg-blue.png)] bg-no-repeat bg-cover ">
          <HeadersV1 link={`/?token=${user?.token}`} text={"Wallet"} withborder={false} theme="white">
            {/* <i className="icon-cancel text-white text-[1.4rem]"></i> */}
            <div></div>
          </HeadersV1>

          <div className="flex items-center justify-center place-items-center mt-[4.8rem] pb-[7.8rem]">
            {/* <Image src="/images/coin.png" height={40} width={40} alt="coins"></Image> */}
            <img height={40} width={40} src="/images/coin.png" alt="coins"></img>
            <p className="display_3_heavy !text-white ml-[.8rem]">{addCommas(removeNonNumeric(user.coins))}</p>
          </div>
        </section>
        <Container>
          <section className="mt-[3.2rem] border rounded-[1.3rem] py-[1.6rem]">
            {/* Buy coins */}
            <div className=" px-[1.2rem]">
              <h3 className="title_heavy !text-primary">Buy Coinss</h3>
              <p className="caption_light !text-primary">Get more coins to gift your friends and win more!</p>
            </div>
            {/* Coins row */}
            <div className="mt-[3.5rem]">
              {coins.map((e, i) => {
                return (
                  <div key={i} className="flex items-center px-[1.2rem] last:border-none border-b py-[1.6rem]">
                    <img src={`/images/${e.image}`} height={20} width={20} alt="coins"></img>
                    <p className="body_heavy !text-primary ml-[.8rem]">{e.amount}</p>
                    <div className="py-[.4rem] px-[.8rem] bg-[#FFBB38] caption_heavy rounded-lg text-primary ml-auto">N{e.price}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </Container>
        <section></section>
      </BaseLayout>
    </Protect>
  );
};

export default Wallet;
